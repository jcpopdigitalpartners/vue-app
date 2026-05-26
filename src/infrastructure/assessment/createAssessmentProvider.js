import { assessmentConfig } from '../config/assessmentConfig.js'
import { FallbackAssessmentProvider } from './FallbackAssessmentProvider.js'
import { HeuristicAssessmentProvider } from './HeuristicAssessmentProvider.js'
import { HttpAssessmentProvider } from './HttpAssessmentProvider.js'

export function createAssessmentProvider() {
  const heuristic = new HeuristicAssessmentProvider()

  if (assessmentConfig.provider === 'api') {
    const remote = new HttpAssessmentProvider(assessmentConfig.apiBaseUrl)
    return new FallbackAssessmentProvider(remote, heuristic)
  }

  return heuristic
}
