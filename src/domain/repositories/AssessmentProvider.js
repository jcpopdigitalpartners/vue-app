/**
 * @typedef {import('../entities/AssessmentResult.js').AssessmentResult} AssessmentResult
 * @typedef {import('../entities/SessionAssessment.js').AssessmentRequest} AssessmentRequest
 * @typedef {import('../entities/SessionAssessment.js').SessionAssessment} SessionAssessment
 * @typedef {import('../entities/Scenario.js').Scenario} Scenario
 * @typedef {import('../entities/Answer.js').Answer} Answer
 */

export class AssessmentProvider {
  /** @param {AssessmentRequest} request @returns {Promise<AssessmentResult>} */
  async assessAnswer() {
    throw new Error('AssessmentProvider.assessAnswer() must be implemented')
  }

  /**
   * @param {Scenario} scenario
   * @param {Answer[]} answers
   * @returns {Promise<SessionAssessment>}
   */
  async assessSession() {
    throw new Error('AssessmentProvider.assessSession() must be implemented')
  }
}
