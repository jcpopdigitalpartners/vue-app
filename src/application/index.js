import { LearningSessionService } from '../domain/services/LearningSessionService.js'
import { AssessmentService } from '../domain/services/AssessmentService.js'
import { MarkdownScenarioRepository } from '../infrastructure/repositories/MarkdownScenarioRepository.js'
import { createAssessmentProvider } from '../infrastructure/assessment/createAssessmentProvider.js'
import { createGetScenariosUseCase } from './useCases/getScenarios.js'
import { createStartLearningSessionUseCase } from './useCases/startLearningSession.js'
import {
  createAdvanceSessionUseCase,
  createBuildSummaryUseCase,
  createGetCurrentQuestionUseCase,
  createSubmitAnswerUseCase,
} from './useCases/sessionActions.js'
import {
  createAssessAnswerUseCase,
  createAssessSessionUseCase,
} from './useCases/assessAnswer.js'

export function createAppServices() {
  const scenarioRepository = new MarkdownScenarioRepository()
  const sessionService = new LearningSessionService(scenarioRepository)
  const assessmentService = new AssessmentService(createAssessmentProvider())

  return {
    getScenarios: createGetScenariosUseCase(scenarioRepository),
    startLearningSession: createStartLearningSessionUseCase(sessionService),
    getCurrentQuestion: createGetCurrentQuestionUseCase(sessionService),
    submitAnswer: createSubmitAnswerUseCase(sessionService),
    advanceSession: createAdvanceSessionUseCase(sessionService),
    buildSummary: createBuildSummaryUseCase(sessionService),
    assessAnswer: createAssessAnswerUseCase(assessmentService),
    assessSession: createAssessSessionUseCase(assessmentService),
  }
}

export const appServices = createAppServices()
