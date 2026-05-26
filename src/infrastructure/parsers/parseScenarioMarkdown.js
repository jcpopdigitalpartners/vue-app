/**
 * Parses scenario Markdown files into domain Scenario objects.
 *
 * Expected format:
 * ---
 * id: scenario-id
 * title: Title
 * summary: One-line description
 * mentalModelGoal: Learning objective
 * keyConcepts:
 *   - Concept one
 * ---
 *
 * ## Context
 * Narrative text...
 *
 * ## Questions
 *
 * ### question-id
 * type: reflection | multiple_choice
 * correct: 2          (1-based, multiple_choice only)
 *
 * Question prompt...
 *
 * 1. Option (multiple_choice only)
 * > Hint: optional
 * > Insight: shown after submit
 */

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/
const BLOCKQUOTE_PATTERN = /^>\s*(Hint|Insight):\s*(.+)$/i

/**
 * @param {string} yaml
 * @returns {Record<string, string | string[]>}
 */
function parseFrontmatter(yaml) {
  /** @type {Record<string, string | string[]>} */
  const meta = {}
  /** @type {string[] | null} */
  let currentList = null
  /** @type {string | null} */
  let currentListKey = null

  for (const rawLine of yaml.split(/\r?\n/)) {
    const line = rawLine.trimEnd()
    if (!line.trim()) {
      continue
    }

    const listMatch = line.match(/^\s*-\s+(.+)$/)
    if (listMatch && currentList && currentListKey) {
      currentList.push(listMatch[1].trim())
      continue
    }

    const keyValueMatch = line.match(/^([\w-]+):\s*(.*)$/)
    if (!keyValueMatch) {
      throw new Error(`Invalid frontmatter line: "${line}"`)
    }

    const [, key, value] = keyValueMatch
    if (!value) {
      currentListKey = key
      currentList = []
      meta[key] = currentList
      continue
    }

    currentList = null
    currentListKey = null
    meta[key] = value.trim()
  }

  return meta
}

/**
 * @param {Record<string, string | string[]>} meta
 * @param {string} source
 */
function validateFrontmatter(meta, source) {
  const required = ['id', 'title', 'summary', 'mentalModelGoal', 'keyConcepts']
  for (const field of required) {
    if (!(field in meta) || meta[field] === '') {
      throw new Error(`${source}: missing required frontmatter field "${field}"`)
    }
  }

  if (!Array.isArray(meta.keyConcepts) || meta.keyConcepts.length === 0) {
    throw new Error(`${source}: "keyConcepts" must be a non-empty list`)
  }
}

/**
 * @param {string} body
 * @param {string} source
 */
function extractContext(body, source) {
  const match = body.match(/## Context\r?\n([\s\S]*?)(?=\r?\n## Questions\r?\n|$)/i)
  if (!match) {
    throw new Error(`${source}: missing "## Context" section`)
  }

  const context = match[1].trim()
  if (!context) {
    throw new Error(`${source}: "## Context" section is empty`)
  }

  return context
}

/**
 * @param {string} block
 * @param {string} source
 * @param {string} questionId
 */
function parseQuestionBlock(block, source, questionId) {
  const lines = block.split(/\r?\n/)
  /** @type {Record<string, string>} */
  const meta = {}
  let index = 0

  while (index < lines.length && !lines[index].trim()) {
    index += 1
  }

  while (index < lines.length && lines[index].trim()) {
    const line = lines[index].trim()
    const match = line.match(/^([\w-]+):\s*(.+)$/)
    if (!match) {
      break
    }
    meta[match[1]] = match[2].trim()
    index += 1
  }

  while (index < lines.length && !lines[index].trim()) {
    index += 1
  }

  /** @type {string[]} */
  const bodyLines = []
  /** @type {string[]} */
  const options = []
  let hint = meta.hint ?? null
  let insight = meta.insight ?? null

  for (; index < lines.length; index += 1) {
    const line = lines[index]
    const trimmed = line.trim()

    const blockquoteMatch = trimmed.match(BLOCKQUOTE_PATTERN)
    if (blockquoteMatch) {
      const [, label, value] = blockquoteMatch
      if (label.toLowerCase() === 'hint') {
        hint = value.trim()
      } else {
        insight = value.trim()
      }
      continue
    }

    const optionMatch = trimmed.match(/^\d+\.\s+(.+)$/)
    if (optionMatch) {
      options.push(optionMatch[1].trim())
      continue
    }

    if (trimmed) {
      bodyLines.push(trimmed)
    }
  }

  const text = bodyLines.join('\n\n').trim()
  if (!text) {
    throw new Error(`${source}: question "${questionId}" is missing prompt text`)
  }

  const type = meta.type
  if (type !== 'reflection' && type !== 'multiple_choice') {
    throw new Error(
      `${source}: question "${questionId}" must set type: reflection or type: multiple_choice`,
    )
  }

  if (!insight) {
    throw new Error(`${source}: question "${questionId}" is missing an Insight blockquote`)
  }

  /** @type {import('../../domain/entities/Question.js').Question} */
  const question = {
    id: questionId,
    type,
    text,
    modelInsight: insight,
  }

  if (hint) {
    question.hint = hint
  }

  if (type === 'multiple_choice') {
    if (options.length < 2) {
      throw new Error(`${source}: question "${questionId}" needs at least two numbered options`)
    }

    const correct = Number(meta.correct)
    if (!Number.isInteger(correct) || correct < 1 || correct > options.length) {
      throw new Error(
        `${source}: question "${questionId}" must set correct: N where N is a valid 1-based option index`,
      )
    }

    question.options = options
    question.correctOptionIndex = correct - 1
  }

  return question
}

/**
 * @param {string} body
 * @param {string} source
 */
function extractQuestions(body, source) {
  const match = body.match(/## Questions\r?\n([\s\S]*)$/i)
  if (!match) {
    throw new Error(`${source}: missing "## Questions" section`)
  }

  const questionsSection = match[1].trim()
  const blocks = questionsSection.split(/\r?\n(?=###\s+)/)

  if (blocks.length === 0 || !blocks[0].trim()) {
    throw new Error(`${source}: no questions found under "## Questions"`)
  }

  return blocks.map((block) => {
    const headingMatch = block.match(/^###\s+([\w-]+)\r?\n([\s\S]*)$/)
    if (!headingMatch) {
      throw new Error(`${source}: each question must start with "### question-id"`)
    }

    const [, questionId, questionBody] = headingMatch
    return parseQuestionBlock(questionBody, source, questionId)
  })
}

/**
 * @param {string} markdown
 * @param {string} [source='scenario.md']
 * @returns {import('../../domain/entities/Scenario.js').Scenario}
 */
export function parseScenarioMarkdown(markdown, source = 'scenario.md') {
  const documentMatch = markdown.match(FRONTMATTER_PATTERN)
  if (!documentMatch) {
    throw new Error(`${source}: file must begin with YAML frontmatter delimited by ---`)
  }

  const [, yaml, body] = documentMatch
  const meta = parseFrontmatter(yaml)
  validateFrontmatter(meta, source)

  const context = extractContext(body, source)
  const questions = extractQuestions(body, source)

  return {
    id: String(meta.id),
    title: String(meta.title),
    summary: String(meta.summary),
    mentalModelGoal: String(meta.mentalModelGoal),
    keyConcepts: /** @type {string[]} */ (meta.keyConcepts),
    context,
    questions,
  }
}
