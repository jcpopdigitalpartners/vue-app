import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import express from 'express'
import { assessAnswer, assessSession, isConfigured } from './geminiAssessment.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const port = Number(process.env.PORT ?? process.env.ASSESSMENT_API_PORT ?? 3001)

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin: allowedOrigins?.length ? allowedOrigins : true,
  }),
)
app.use(express.json({ limit: '64kb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    provider: 'gemini',
    configured: isConfigured(),
  })
})

app.post('/api/assess/answer', async (req, res) => {
  if (!isConfigured()) {
    res.status(503).json({ error: 'Assessment API is not configured. Set GEMINI_API_KEY in server/.env' })
    return
  }

  try {
    const { scenario, question, answer } = req.body ?? {}
    if (!scenario || !question || !answer) {
      res.status(400).json({ error: 'Missing scenario, question, or answer' })
      return
    }

    const result = await assessAnswer({ scenario, question, answer })
    res.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Assessment failed'
    res.status(502).json({ error: message })
  }
})

app.post('/api/assess/session', async (req, res) => {
  if (!isConfigured()) {
    res.status(503).json({ error: 'Assessment API is not configured. Set GEMINI_API_KEY in server/.env' })
    return
  }

  try {
    const { scenario, answers } = req.body ?? {}
    if (!scenario || !Array.isArray(answers)) {
      res.status(400).json({ error: 'Missing scenario or answers' })
      return
    }

    const result = await assessSession(scenario, answers)
    res.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Session assessment failed'
    res.status(502).json({ error: message })
  }
})

app.listen(port, () => {
  console.log(`Assessment API listening on http://localhost:${port}`)
  console.log(`Gemini configured: ${isConfigured() ? 'yes' : 'no (set GEMINI_API_KEY in server/.env)'}`)
  if (isConfigured()) {
    console.log(`Gemini model: ${process.env.GEMINI_MODEL ?? 'gemini-2.0-flash-lite'}`)
  }
}).on('error', (error) => {
  if (error && typeof error === 'object' && 'code' in error && error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the other assessment API process first.`)
  } else {
    console.error(error)
  }
  process.exit(1)
})
