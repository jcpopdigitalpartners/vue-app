/**
 * @typedef {import('../entities/Scenario.js').Scenario} Scenario
 * @typedef {import('../entities/Question.js').Question} Question
 * @typedef {import('../entities/Answer.js').Answer} Answer
 * @typedef {import('../entities/LearningSession.js').LearningSession} LearningSession
 * @typedef {import('../repositories/ScenarioRepository.js').ScenarioRepository} ScenarioRepository
 */

let sessionCounter = 0

export class LearningSessionService {
  /** @param {ScenarioRepository} scenarioRepository */
  constructor(scenarioRepository) {
    this.scenarioRepository = scenarioRepository
  }

  /** @param {string} scenarioId @returns {Promise<{ session: LearningSession, scenario: Scenario }>} */
  async startSession(scenarioId) {
    const scenario = await this.scenarioRepository.getById(scenarioId)
    if (!scenario) {
      throw new Error(`Scenario not found: ${scenarioId}`)
    }
    if (scenario.questions.length === 0) {
      throw new Error(`Scenario has no questions: ${scenarioId}`)
    }

    const session = {
      id: `session-${++sessionCounter}`,
      scenarioId,
      currentQuestionIndex: 0,
      status: 'active',
      answers: [],
      lastInsight: null,
    }

    return { session, scenario }
  }

  /**
   * @param {LearningSession} session
   * @param {Scenario} scenario
   * @returns {{ question: Question, progress: { current: number, total: number } } | null}
   */
  getCurrentQuestion(session, scenario) {
    if (session.status === 'completed') {
      return null
    }

    const question = scenario.questions[session.currentQuestionIndex]
    if (!question) {
      return null
    }

    return {
      question,
      progress: {
        current: session.currentQuestionIndex + 1,
        total: scenario.questions.length,
      },
    }
  }

  /**
   * @param {LearningSession} session
   * @param {Scenario} scenario
   * @param {string | number} value
   * @returns {{ session: LearningSession, answer: Answer, insight: string, isComplete: boolean }}
   */
  submitAnswer(session, scenario, value) {
    if (session.status === 'completed') {
      throw new Error('Session is already complete')
    }

    const question = scenario.questions[session.currentQuestionIndex]
    if (!question) {
      throw new Error('No active question')
    }

    /** @type {Answer} */
    const answer = {
      questionId: question.id,
      value,
    }

    if (question.type === 'multiple_choice') {
      answer.isCorrect = value === question.correctOptionIndex
    }

    const updatedSession = {
      ...session,
      status: 'reviewing',
      answers: [...session.answers, answer],
      lastInsight: question.modelInsight,
    }

    return {
      session: updatedSession,
      answer,
      insight: question.modelInsight,
      isComplete: false,
    }
  }

  /** @param {LearningSession} session @param {Scenario} scenario @returns {LearningSession} */
  advanceSession(session, scenario) {
    const nextIndex = session.currentQuestionIndex + 1
    const isComplete = nextIndex >= scenario.questions.length

    return {
      ...session,
      currentQuestionIndex: isComplete ? session.currentQuestionIndex : nextIndex,
      status: isComplete ? 'completed' : 'active',
      lastInsight: isComplete ? session.lastInsight : null,
    }
  }

  /**
   * @param {LearningSession} session
   * @param {Scenario} scenario
   * @returns {{ title: string, goal: string, concepts: string[], insights: string[] }}
   */
  buildSummary(session, scenario) {
    const insights = scenario.questions
      .map((question) => question.modelInsight)
      .filter(Boolean)

    return {
      title: scenario.title,
      goal: scenario.mentalModelGoal,
      concepts: scenario.keyConcepts,
      insights,
    }
  }
}
