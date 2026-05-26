/**
 * @typedef {'developing' | 'partial' | 'solid' | 'strong'} AssessmentLevel
 */

/**
 * @typedef {Object} AssessmentResult
 * @property {number} score - Calibrated score from 0 to 100
 * @property {AssessmentLevel} level
 * @property {string} summary
 * @property {string[]} strengths
 * @property {string[]} gaps
 * @property {string} calibrationNote - How the score was anchored to the model insight
 * @property {string} provider - heuristic | openai
 */

export {}
