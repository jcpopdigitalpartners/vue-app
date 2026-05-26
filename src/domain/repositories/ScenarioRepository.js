/**
 * @typedef {import('../entities/Scenario.js').Scenario} Scenario
 */

/**
 * Port for loading scenario content.
 * Infrastructure implementations may read from memory, API, or files.
 */
export class ScenarioRepository {
  /** @returns {Promise<Scenario[]>} */
  async getAll() {
    throw new Error('ScenarioRepository.getAll() must be implemented')
  }

  /** @param {string} id @returns {Promise<Scenario | null>} */
  async getById(id) {
    throw new Error('ScenarioRepository.getById() must be implemented')
  }
}
