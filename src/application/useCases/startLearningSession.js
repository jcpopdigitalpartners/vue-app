/** @param {import('../../domain/services/LearningSessionService.js').LearningSessionService} sessionService */
export function createStartLearningSessionUseCase(sessionService) {
  return async function startLearningSession(scenarioId) {
    return sessionService.startSession(scenarioId)
  }
}
