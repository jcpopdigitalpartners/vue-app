import { ref, computed, onMounted } from 'vue'

import { appServices } from '../index.js'



export function useLearningSession() {

  const scenarios = ref([])

  const scenario = ref(null)

  const session = ref(null)

  const isLoading = ref(true)

  const loadError = ref(null)

  const hasBegun = ref(false)

  const draftAnswer = ref('')

  const selectedOption = ref(null)

  const showInsight = ref(false)

  const isAssessing = ref(false)

  const assessmentError = ref(null)

  const lastAnswer = ref(null)

  const lastAssessment = ref(null)

  const sessionAssessment = ref(null)



  const currentStep = computed(() => {

    if (!session.value || !scenario.value || !hasBegun.value) {

      return null

    }

    return appServices.getCurrentQuestion(session.value, scenario.value)

  })



  const summary = computed(() => {

    if (!session.value || !scenario.value || session.value.status !== 'completed') {

      return null

    }



    const base = appServices.buildSummary(session.value, scenario.value)

    return {

      ...base,

      assessment: sessionAssessment.value,

    }

  })



  const phase = computed(() => {
    if (!session.value) return 'pick'
    if (session.value.status === 'completed') {
      if (isAssessing.value) return 'assessing'
      return 'complete'
    }
    if (!hasBegun.value) return 'briefing'
    if (isAssessing.value) return 'assessing'
    if (showInsight.value) return 'insight'
    return 'question'
  })



  const sessionTitle = computed(() => scenario.value?.title ?? 'Mental Model Lab')



  async function loadScenarios() {

    isLoading.value = true

    loadError.value = null



    try {

      scenarios.value = await appServices.getScenarios()

    } catch (error) {

      loadError.value = error instanceof Error ? error.message : 'Failed to load scenarios'

      scenarios.value = []

    } finally {

      isLoading.value = false

    }

  }



  async function selectScenario(scenarioId) {

    isLoading.value = true

    resetDraft()



    const result = await appServices.startLearningSession(scenarioId)

    scenario.value = result.scenario

    session.value = result.session

    hasBegun.value = false

    showInsight.value = false

    lastAnswer.value = null

    lastAssessment.value = null

    sessionAssessment.value = null

    assessmentError.value = null

    isLoading.value = false

  }



  function beginQuestions() {

    hasBegun.value = true

  }



  function resetDraft() {

    draftAnswer.value = ''

    selectedOption.value = null

  }



  function canSubmit() {

    if (!currentStep.value || isAssessing.value) return false

    const question = currentStep.value.question



    if (question.type === 'reflection') {

      return draftAnswer.value.trim().length > 0

    }



    return selectedOption.value !== null

  }



  async function submitCurrentAnswer() {

    if (!session.value || !scenario.value || !currentStep.value || !canSubmit()) {

      return

    }



    const question = currentStep.value.question

    const value = question.type === 'reflection' ? draftAnswer.value.trim() : selectedOption.value



    const result = appServices.submitAnswer(session.value, scenario.value, value)

    session.value = result.session

    lastAnswer.value = result.answer

    assessmentError.value = null

    isAssessing.value = true



    try {

      const assessment = await appServices.assessAnswer({

        scenario: scenario.value,

        question,

        answer: result.answer,

      })



      lastAssessment.value = assessment
      if (assessment.fallbackReason) {
        assessmentError.value = `Gemini unavailable (${assessment.fallbackReason}). Showing local calibration.`
      }

      const answers = [...session.value.answers]

      answers[answers.length - 1] = {

        ...answers[answers.length - 1],

        assessment,

      }

      session.value = {

        ...session.value,

        answers,

      }

    } catch (error) {

      assessmentError.value =

        error instanceof Error ? error.message : 'Assessment failed. Showing model insight only.'

      lastAssessment.value = null

    } finally {

      isAssessing.value = false

      showInsight.value = true

    }

  }



  async function continueToNext() {

    if (!session.value || !scenario.value) return



    session.value = appServices.advanceSession(session.value, scenario.value)

    showInsight.value = false

    lastAnswer.value = null

    lastAssessment.value = null

    assessmentError.value = null

    resetDraft()



    if (session.value.status === 'completed') {

      isAssessing.value = true

      try {

        sessionAssessment.value = await appServices.assessSession(

          scenario.value,

          session.value.answers,

        )

        if (sessionAssessment.value?.fallbackReason) {
          assessmentError.value = `Gemini unavailable (${sessionAssessment.value.fallbackReason}). Showing local calibration.`
        }

      } catch (error) {

        assessmentError.value =

          error instanceof Error ? error.message : 'Session assessment unavailable.'

      } finally {

        isAssessing.value = false

      }

    }

  }



  function exitSession() {

    scenario.value = null

    session.value = null

    hasBegun.value = false

    showInsight.value = false

    isAssessing.value = false

    lastAnswer.value = null

    lastAssessment.value = null

    sessionAssessment.value = null

    assessmentError.value = null

    resetDraft()

  }



  function restart() {

    exitSession()

  }



  onMounted(loadScenarios)



  return {

    scenarios,

    scenario,

    session,

    isLoading,

    loadError,

    draftAnswer,

    selectedOption,

    showInsight,

    isAssessing,

    assessmentError,

    lastAnswer,

    lastAssessment,

    sessionAssessment,

    currentStep,

    summary,

    phase,

    sessionTitle,

    loadScenarios,

    selectScenario,

    beginQuestions,

    canSubmit,

    submitCurrentAnswer,

    continueToNext,

    exitSession,

    restart,

  }

}

