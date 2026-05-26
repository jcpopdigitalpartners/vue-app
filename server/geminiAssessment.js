const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'

export function isConfigured() {
  return Boolean(process.env.GEMINI_API_KEY)
}

function getModel() {
  return process.env.GEMINI_MODEL ?? 'gemini-2.0-flash-lite'
}

function clampScore(value) {
  const score = Number(value)
  if (!Number.isFinite(score)) {
    return 0
  }
  return Math.max(0, Math.min(100, Math.round(score)))
}

function scoreToLevel(score) {
  if (score >= 80) return 'strong'
  if (score >= 60) return 'solid'
  if (score >= 40) return 'partial'
  return 'developing'
}

function normalizeAssessment(result) {
  const score = clampScore(result.score)
  return {
    score,
    level: scoreToLevel(score),
    summary: String(result.summary ?? 'Assessment completed.'),
    strengths: Array.isArray(result.strengths) ? result.strengths.map(String).slice(0, 4) : [],
    gaps: Array.isArray(result.gaps) ? result.gaps.map(String).slice(0, 4) : [],
    calibrationNote: String(
      result.calibrationNote ?? 'Calibrated against the scenario model insight.',
    ),
    provider: 'gemini',
  }
}

function buildAnswerPrompt({ scenario, question, answer }) {
  const learnerAnswer =
    question.type === 'reflection'
      ? String(answer.value)
      : question.options?.[Number(answer.value)] ?? String(answer.value)

  return {
    system: [
      'You calibrate learner answers for a mental-model training app.',
      'Return strict JSON with keys: score, level, summary, strengths, gaps, calibrationNote.',
      'Score from 0-100 against the authored model insight, not general correctness.',
      'Levels must be one of: developing, partial, solid, strong.',
    ].join(' '),
    user: JSON.stringify(
      {
        scenarioTitle: scenario.title,
        scenarioContext: scenario.context,
        mentalModelGoal: scenario.mentalModelGoal,
        keyConcepts: scenario.keyConcepts,
        question: question.text,
        questionType: question.type,
        learnerAnswer,
        modelInsightAnchor: question.modelInsight,
      },
      null,
      2,
    ),
  }
}

function buildSessionPrompt(scenario, questionAssessments) {
  return {
    system: [
      'You synthesize a session-level mental model assessment.',
      'Return strict JSON with keys: overallScore, readinessSummary, focusAreas.',
      'overallScore must be 0-100. focusAreas must be an array of short strings.',
    ].join(' '),
    user: JSON.stringify(
      {
        scenarioTitle: scenario.title,
        mentalModelGoal: scenario.mentalModelGoal,
        questionAssessments,
      },
      null,
      2,
    ),
  }
}

async function requestJson(payload) {
  const model = getModel()
  const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: payload.system }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: payload.user }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Gemini assessment failed: ${response.status} ${errorText}`)
  }

  const data = await response.json()
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!content) {
    throw new Error('Gemini assessment returned an empty response')
  }

  return JSON.parse(content)
}

export async function assessAnswer(request) {
  const payload = buildAnswerPrompt(request)
  const result = await requestJson(payload)
  return normalizeAssessment(result)
}

export async function assessSession(scenario, answers) {
  const questionAssessments = await Promise.all(
    answers.map(async (entry) => {
      if (entry.assessment) {
        return entry.assessment
      }

      const question = scenario.questions.find((item) => item.id === entry.questionId)
      if (!question) {
        throw new Error(`Question not found: ${entry.questionId}`)
      }

      return assessAnswer({ scenario, question, answer: entry })
    }),
  )

  const payload = buildSessionPrompt(scenario, questionAssessments)
  const result = await requestJson(payload)

  return {
    overallScore: clampScore(result.overallScore),
    overallLevel: scoreToLevel(clampScore(result.overallScore)),
    readinessSummary: String(result.readinessSummary ?? ''),
    focusAreas: Array.isArray(result.focusAreas) ? result.focusAreas.map(String).slice(0, 4) : [],
    questionAssessments,
    provider: 'gemini',
  }
}
