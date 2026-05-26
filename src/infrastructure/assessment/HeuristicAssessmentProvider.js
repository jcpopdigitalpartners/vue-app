import { AssessmentProvider } from '../../domain/repositories/AssessmentProvider.js'
import { overlapRatio, scoreToLevel, tokenize } from './assessmentUtils.js'

export class HeuristicAssessmentProvider extends AssessmentProvider {
  /** @param {import('../../domain/entities/SessionAssessment.js').AssessmentRequest} request */
  async assessAnswer({ scenario, question, answer }) {
    if (question.type === 'multiple_choice') {
      return this.assessMultipleChoice({ scenario, question, answer })
    }

    return this.assessReflection({ scenario, question, answer })
  }

  /** @param {import('../../domain/entities/Scenario.js').Scenario} scenario @param {import('../../domain/entities/Answer.js').Answer[]} answers */
  async assessSession(scenario, answers) {
    const questionAssessments = await Promise.all(
      answers.map((entry) => {
        const question = scenario.questions.find((item) => item.id === entry.questionId)
        if (!question) {
          throw new Error(`Question not found: ${entry.questionId}`)
        }

        if (entry.assessment) {
          return Promise.resolve(entry.assessment)
        }

        return this.assessAnswer({ scenario, question, answer: entry })
      }),
    )

    const overallScore = Math.round(
      questionAssessments.reduce((total, item) => total + item.score, 0) / questionAssessments.length,
    )

    const focusAreas = [...new Set(questionAssessments.flatMap((item) => item.gaps))].slice(0, 3)

    return {
      overallScore,
      overallLevel: scoreToLevel(overallScore),
      readinessSummary: this.buildReadinessSummary(overallScore, scenario.title),
      focusAreas,
      questionAssessments,
      provider: 'heuristic',
    }
  }

  /** @param {import('../../domain/entities/SessionAssessment.js').AssessmentRequest} request */
  assessMultipleChoice({ scenario, question, answer }) {
    const isCorrect = answer.isCorrect === true
    const selectedIndex = Number(answer.value)
    const selectedOption = question.options?.[selectedIndex] ?? 'your choice'

    return Promise.resolve({
      score: isCorrect ? 92 : 38,
      level: isCorrect ? 'strong' : 'partial',
      summary: isCorrect
        ? 'Your choice aligns with the calibrated mental model for this scenario.'
        : 'Your choice misses a key relationship in the scenario model.',
      strengths: isCorrect
        ? ['Correctly mapped symptoms to the underlying model']
        : [],
      gaps: isCorrect
        ? []
        : [`Revisit why "${selectedOption}" is weaker than the target model explanation`],
      calibrationNote: `Score calibrated against the scenario insight and ${scenario.keyConcepts.slice(0, 2).join(', ')}.`,
      provider: 'heuristic',
    })
  }

  /** @param {import('../../domain/entities/SessionAssessment.js').AssessmentRequest} request */
  assessReflection({ scenario, question, answer }) {
    const response = String(answer.value).trim()
    const words = response.split(/\s+/).filter(Boolean)
    const depthScore = Math.min(35, words.length * 2.5)
    const conceptScore = this.scoreConceptCoverage(response, scenario.keyConcepts)
    const alignmentScore = Math.round(overlapRatio(response, question.modelInsight) * 30)
    const score = Math.round(Math.min(100, depthScore + conceptScore + alignmentScore))
    const level = scoreToLevel(score)
    const matchedConcepts = scenario.keyConcepts.filter((concept) =>
      response.toLowerCase().includes(concept.toLowerCase()),
    )
    const missingConcepts = scenario.keyConcepts.filter(
      (concept) => !matchedConcepts.includes(concept),
    )

    return Promise.resolve({
      score,
      level,
      summary: this.buildReflectionSummary(level, matchedConcepts.length, scenario.keyConcepts.length),
      strengths: this.buildStrengths(matchedConcepts, words.length, alignmentScore),
      gaps: this.buildGaps(missingConcepts, words.length, alignmentScore),
      calibrationNote: `Calibrated against the authored model insight and scenario concepts (${scenario.keyConcepts.join(', ')}).`,
      provider: 'heuristic',
    })
  }

  /** @param {string} response @param {string[]} concepts */
  scoreConceptCoverage(response, concepts) {
    if (concepts.length === 0) {
      return 0
    }

    const hits = concepts.filter((concept) => {
      const tokens = tokenize(concept)
      return [...tokens].some((token) => response.toLowerCase().includes(token))
    })

    return Math.round((hits.length / concepts.length) * 35)
  }

  /** @param {import('../../domain/entities/AssessmentResult.js').AssessmentResult['level']} level @param {number} matched @param {number} total */
  buildReflectionSummary(level, matched, total) {
    if (level === 'strong') {
      return 'Your reasoning shows a strong, layered mental model with good concept coverage.'
    }
    if (level === 'solid') {
      return 'Your answer demonstrates a workable model with room to sharpen a few connections.'
    }
    if (level === 'partial') {
      return 'You captured part of the model, but some causal links or concepts are still implicit.'
    }
    return 'Your response starts the model, but needs more structure and scenario-specific concepts.'
  }

  /** @param {string[]} matchedConcepts @param {number} wordCount @param {number} alignmentScore */
  buildStrengths(matchedConcepts, wordCount, alignmentScore) {
    const strengths = []
    if (matchedConcepts.length > 0) {
      strengths.push(`Referenced key concepts: ${matchedConcepts.join(', ')}`)
    }
    if (wordCount >= 30) {
      strengths.push('Provided enough detail to expose your reasoning process')
    }
    if (alignmentScore >= 18) {
      strengths.push('Showed alignment with the target model insight')
    }
    if (strengths.length === 0) {
      strengths.push('You engaged with the scenario rather than skipping the reflection')
    }
    return strengths
  }

  /** @param {string[]} missingConcepts @param {number} wordCount @param {number} alignmentScore */
  buildGaps(missingConcepts, wordCount, alignmentScore) {
    const gaps = []
    if (wordCount < 20) {
      gaps.push('Add more step-by-step reasoning so the model can be assessed accurately')
    }
    if (missingConcepts.length > 0) {
      gaps.push(`Integrate missing concepts: ${missingConcepts.slice(0, 3).join(', ')}`)
    }
    if (alignmentScore < 12) {
      gaps.push('Connect your answer more explicitly to the scenario symptoms and constraints')
    }
    return gaps.slice(0, 3)
  }

  /** @param {number} overallScore @param {string} title */
  buildReadinessSummary(overallScore, title) {
    if (overallScore >= 80) {
      return `You built a strong mental model for "${title}" and can likely transfer it to similar situations.`
    }
    if (overallScore >= 60) {
      return `You have a solid working model for "${title}" with a few areas to reinforce.`
    }
    if (overallScore >= 40) {
      return `You started a usable model for "${title}", but key links still need deliberate practice.`
    }
    return `Your model for "${title}" is still forming — repeat the scenario and focus on the highlighted gaps.`
  }
}
