/** @param {import('../../domain/services/LearningSessionService.js').LearningSessionService} sessionService */
export function createSubmitAnswerUseCase(sessionService) {
  return function submitAnswer(session, scenario, value) {
    return sessionService.submitAnswer(session, scenario, value)
  }
}

/** @param {import('../../domain/services/LearningSessionService.js').LearningSessionService} sessionService */
export function createAdvanceSessionUseCase(sessionService) {
  return function advanceSession(session, scenario) {
    return sessionService.advanceSession(session, scenario)
  }
}

/** @param {import('../../domain/services/LearningSessionService.js').LearningSessionService} sessionService */
export function createBuildSummaryUseCase(sessionService) {
  return function buildSummary(session, scenario) {
    return sessionService.buildSummary(session, scenario)
  }
}

/** @param {import('../../domain/services/LearningSessionService.js').LearningSessionService} sessionService */
export function createGetCurrentQuestionUseCase(sessionService) {
  return function getCurrentQuestion(session, scenario) {
    return sessionService.getCurrentQuestion(session, scenario)
  }
}
