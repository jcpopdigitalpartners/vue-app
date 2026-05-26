import { AssessmentProvider } from '../../domain/repositories/AssessmentProvider.js'

export class HttpAssessmentProvider extends AssessmentProvider {
  /** @param {string} baseUrl */
  constructor(baseUrl = '/api') {
    super()
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  /** @param {import('../../domain/entities/SessionAssessment.js').AssessmentRequest} request */
  async assessAnswer(request) {
    return this.post('/assess/answer', request)
  }

  /** @param {import('../../domain/entities/Scenario.js').Scenario} scenario @param {import('../../domain/entities/Answer.js').Answer[]} answers */
  async assessSession(scenario, answers) {
    return this.post('/assess/session', { scenario, answers })
  }

  /** @param {string} path @param {unknown} body */
  async post(path, body) {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      let message = `Assessment API failed: ${response.status}`
      try {
        const payload = await response.json()
        if (payload.error) {
          message = payload.error
        }
      } catch {
        // ignore JSON parse errors
      }
      throw new Error(message)
    }

    return response.json()
  }
}
