/**
 * @typedef {import('./AssessmentResult.js').AssessmentResult} AssessmentResult
 */

/**
 * @typedef {import('./Answer.js').Answer} Answer
 */

/**
 * @typedef {import('./Scenario.js').Scenario} Scenario
 */

/**
 * @typedef {import('./Question.js').Question} Question
 */

/**
 * @typedef {Object} AssessmentRequest
 * @property {Scenario} scenario
 * @property {Question} question
 * @property {Answer} answer
 */

/**
 * @typedef {Object} SessionAssessment
 * @property {number} overallScore
 * @property {import('./AssessmentResult.js').AssessmentLevel} overallLevel
 * @property {string} readinessSummary
 * @property {string[]} focusAreas
 * @property {AssessmentResult[]} questionAssessments
 */

export {}
