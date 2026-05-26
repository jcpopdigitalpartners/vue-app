/**
 * @typedef {import('./Question.js').Question} Question
 */

/**
 * @typedef {Object} Scenario
 * @property {string} id
 * @property {string} title
 * @property {string} summary
 * @property {string} context - Narrative setup for the scenario
 * @property {string} mentalModelGoal - What conceptual understanding this builds
 * @property {string[]} keyConcepts - Anchor terms for the mental model
 * @property {Question[]} questions
 */

export {}
