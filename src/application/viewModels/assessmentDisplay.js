/** @param {import('../../domain/entities/AssessmentResult.js').AssessmentResult['level']} level */
export function levelLabel(level) {
  return {
    developing: 'Developing',
    partial: 'Partial model',
    solid: 'Solid model',
    strong: 'Strong model',
  }[level]
}
