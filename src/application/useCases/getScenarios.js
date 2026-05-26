/** @param {import('../domain/repositories/ScenarioRepository.js').ScenarioRepository} scenarioRepository */
export function createGetScenariosUseCase(scenarioRepository) {
  return async function getScenarios() {
    return scenarioRepository.getAll()
  }
}
