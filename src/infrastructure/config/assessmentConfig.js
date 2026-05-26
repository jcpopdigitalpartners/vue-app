export const assessmentConfig = {
  provider: import.meta.env.VITE_ASSESSMENT_PROVIDER ?? 'heuristic',
  apiBaseUrl: import.meta.env.VITE_ASSESSMENT_API_URL ?? '/api',
}
