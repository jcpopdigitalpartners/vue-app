/**
 * @typedef {import('./Answer.js').Answer} Answer
 */

/**
 * @typedef {'active' | 'reviewing' | 'completed'} SessionStatus
 */

/**
 * @typedef {Object} LearningSession
 * @property {string} id
 * @property {string} scenarioId
 * @property {number} currentQuestionIndex
 * @property {SessionStatus} status
 * @property {Answer[]} answers
 * @property {string | null} lastInsight - Most recent model insight shown to the learner
 */

export {}
