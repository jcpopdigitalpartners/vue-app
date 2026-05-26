/**
 * @typedef {import('../entities/AssessmentResult.js').AssessmentResult} AssessmentResult
 * @typedef {import('../entities/SessionAssessment.js').AssessmentRequest} AssessmentRequest
 * @typedef {import('../entities/SessionAssessment.js').SessionAssessment} SessionAssessment
 * @typedef {import('../entities/Scenario.js').Scenario} Scenario
 * @typedef {import('../entities/Answer.js').Answer} Answer
 * @typedef {import('../repositories/AssessmentProvider.js').AssessmentProvider} AssessmentProvider
 */

/** @param {number} score @returns {AssessmentResult['level']} */
export function scoreToLevel(score) {
  if (score >= 80) return 'strong'
  if (score >= 60) return 'solid'
  if (score >= 40) return 'partial'
  return 'developing'
}

export class AssessmentService {
  /** @param {AssessmentProvider} provider */
  constructor(provider) {
    this.provider = provider
  }

  /** @param {AssessmentRequest} request @returns {Promise<AssessmentResult>} */
  assessAnswer(request) {
    return this.provider.assessAnswer(request)
  }

  /**
   * @param {Scenario} scenario
   * @param {Answer[]} answers
   * @returns {Promise<SessionAssessment>}
   */
  assessSession(scenario, answers) {
    return this.provider.assessSession(scenario, answers)
  }
}
