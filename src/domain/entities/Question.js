/**
 * @typedef {'reflection' | 'multiple_choice'} QuestionType
 */

/**
 * @typedef {Object} Question
 * @property {string} id
 * @property {string} text
 * @property {QuestionType} type
 * @property {string} [hint] - Optional nudge before answering
 * @property {string[]} [options] - Required for multiple_choice
 * @property {number} [correctOptionIndex] - Required for multiple_choice
 * @property {string} modelInsight - Shown after answering to reinforce the mental model
 */

export {}
