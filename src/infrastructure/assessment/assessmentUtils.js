/**
 * @param {string} text
 * @returns {Set<string>}
 */
export function tokenize(text) {
  return new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((token) => token.length > 3),
  )
}

/**
 * @param {string} left
 * @param {string} right
 * @returns {number}
 */
export function overlapRatio(left, right) {
  const leftTokens = tokenize(left)
  const rightTokens = tokenize(right)
  if (leftTokens.size === 0 || rightTokens.size === 0) {
    return 0
  }

  let shared = 0
  for (const token of leftTokens) {
    if (rightTokens.has(token)) {
      shared += 1
    }
  }

  return shared / Math.max(leftTokens.size, rightTokens.size)
}

/**
 * @param {number} score
 * @returns {import('../../domain/entities/AssessmentResult.js').AssessmentResult['level']}
 */
export function scoreToLevel(score) {
  if (score >= 80) return 'strong'
  if (score >= 60) return 'solid'
  if (score >= 40) return 'partial'
  return 'developing'
}

/**
 * @param {import('../../domain/entities/AssessmentResult.js').AssessmentResult['level']} level
 * @returns {string}
 */
export function levelLabel(level) {
  return {
    developing: 'Developing',
    partial: 'Partial model',
    solid: 'Solid model',
    strong: 'Strong model',
  }[level]
}
