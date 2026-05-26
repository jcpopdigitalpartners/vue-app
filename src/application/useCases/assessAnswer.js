/** @param {import('../../domain/services/AssessmentService.js').AssessmentService} assessmentService */
export function createAssessAnswerUseCase(assessmentService) {
  return function assessAnswer(request) {
    return assessmentService.assessAnswer(request)
  }
}

/** @param {import('../../domain/services/AssessmentService.js').AssessmentService} assessmentService */
export function createAssessSessionUseCase(assessmentService) {
  return function assessSession(scenario, answers) {
    return assessmentService.assessSession(scenario, answers)
  }
}
