import { AssessmentProvider } from '../../domain/repositories/AssessmentProvider.js'

export class FallbackAssessmentProvider extends AssessmentProvider {
  /** @param {AssessmentProvider} primary @param {AssessmentProvider} fallback */
  constructor(primary, fallback) {
    super()
    this.primary = primary
    this.fallback = fallback
    /** @type {string | null} */
    this.lastFallbackReason = null
  }

  /** @param {import('../../domain/entities/SessionAssessment.js').AssessmentRequest} request */
  async assessAnswer(request) {
    try {
      this.lastFallbackReason = null
      return await this.primary.assessAnswer(request)
    } catch (error) {
      const reason = this.errorSummary(error)
      this.lastFallbackReason = reason
      const result = await this.fallback.assessAnswer(request)
      return {
        ...result,
        summary: `Gemini assessment unavailable (${reason}). Showing local calibration instead.`,
        calibrationNote: `${result.calibrationNote} Remote assessment failed (${reason}); used local calibration instead.`,
        provider: 'heuristic',
        fallbackReason: reason,
      }
    }
  }

  /** @param {import('../../domain/entities/Scenario.js').Scenario} scenario @param {import('../../domain/entities/Answer.js').Answer[]} answers */
  async assessSession(scenario, answers) {
    try {
      this.lastFallbackReason = null
      return await this.primary.assessSession(scenario, answers)
    } catch (error) {
      const reason = this.errorSummary(error)
      this.lastFallbackReason = reason
      const result = await this.fallback.assessSession(scenario, answers)
      return {
        ...result,
        readinessSummary: `Gemini assessment unavailable (${reason}). ${result.readinessSummary}`,
        provider: 'heuristic',
        fallbackReason: reason,
      }
    }
  }

  /** @param {unknown} error */
  errorSummary(error) {
    if (!(error instanceof Error)) {
      return 'API error'
    }

    if (error.message.includes('not configured')) {
      return 'assessment API not configured'
    }

    if (error.message.includes('insufficient_quota') || error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED')) {
      return 'Gemini quota exceeded'
    }

    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return 'assessment API unreachable — is npm run dev:server running?'
    }

    return error.message.slice(0, 120)
  }
}
