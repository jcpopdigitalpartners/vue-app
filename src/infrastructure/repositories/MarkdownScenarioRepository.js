import { ScenarioRepository } from '../../domain/repositories/ScenarioRepository.js'
import { parseScenarioMarkdown } from '../parsers/parseScenarioMarkdown.js'

const scenarioModules = import.meta.glob('../../../scenarios/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

export class MarkdownScenarioRepository extends ScenarioRepository {
  constructor() {
    super()
    /** @type {import('../../domain/entities/Scenario.js').Scenario[] | null} */
    this.cache = null
  }

  loadScenarios() {
    if (this.cache) {
      return this.cache
    }

    this.cache = Object.entries(scenarioModules)
      .filter(([path]) => {
        const filename = path.split('/').pop() ?? path
        return !filename.startsWith('_')
      })
      .map(([path, markdown]) => {
        const filename = path.split('/').pop() ?? path
        return parseScenarioMarkdown(String(markdown), filename)
      })

    this.cache.sort((a, b) => a.title.localeCompare(b.title))
    return this.cache
  }

  /** @returns {Promise<import('../../domain/entities/Scenario.js').Scenario[]>} */
  async getAll() {
    return [...this.loadScenarios()]
  }

  /** @param {string} id @returns {Promise<import('../../domain/entities/Scenario.js').Scenario | null>} */
  async getById(id) {
    return this.loadScenarios().find((scenario) => scenario.id === id) ?? null
  }
}
