<script setup>
import AppLayout from '../layouts/AppLayout.vue'
import LoadingState from '../components/ui/LoadingState.vue'
import EmptyState from '../components/ui/EmptyState.vue'
import AssessingState from '../components/AssessingState.vue'
import ScenarioPicker from '../components/ScenarioPicker.vue'
import ScenarioBriefing from '../components/ScenarioBriefing.vue'
import ScenarioContext from '../components/ScenarioContext.vue'
import SessionProgress from '../components/SessionProgress.vue'
import QuestionCard from '../components/QuestionCard.vue'
import InsightPanel from '../components/InsightPanel.vue'
import SessionSummary from '../components/SessionSummary.vue'
import { useLearningSession } from '../../application/composables/useLearningSession.js'

const {
  scenarios,
  scenario,
  session,
  isLoading,
  loadError,
  draftAnswer,
  selectedOption,
  lastAnswer,
  lastAssessment,
  assessmentError,
  currentStep,
  summary,
  phase,
  sessionTitle,
  selectScenario,
  beginQuestions,
  canSubmit,
  submitCurrentAnswer,
  continueToNext,
  exitSession,
  restart,
  loadScenarios,
} = useLearningSession()

function goHome() {
  if (phase.value === 'pick') return
  exitSession()
}
</script>

<template>
  <AppLayout
    :phase="phase"
    :session-title="sessionTitle"
    @home="goHome"
    @exit="exitSession"
  >
    <LoadingState v-if="isLoading && phase === 'pick' && scenarios.length === 0" />

    <EmptyState
      v-else-if="loadError && phase === 'pick'"
      title="Could not load scenarios"
      :description="loadError"
      @action="loadScenarios"
    >
      <template #action>Try again</template>
    </EmptyState>

    <Transition v-else name="fade-slide" mode="out-in">
      <ScenarioPicker
        v-if="phase === 'pick'"
        key="pick"
        :scenarios="scenarios"
        :is-loading="isLoading"
        @select="selectScenario"
      />

      <ScenarioBriefing
        v-else-if="phase === 'briefing' && scenario"
        key="briefing"
        :scenario="scenario"
        @begin="beginQuestions"
        @back="exitSession"
      />

      <AssessingState
        v-else-if="phase === 'assessing' && session?.status === 'completed'"
        key="session-assessing"
        message="Generating session assessment…"
      />

      <SessionSummary
        v-else-if="phase === 'complete' && summary"
        key="complete"
        :summary="summary"
        @restart="restart"
      />

      <div v-else-if="scenario && session" key="session" class="session-layout">
        <ScenarioContext :scenario="scenario" />

        <div class="session-main">
          <SessionProgress
            v-if="currentStep"
            :current="currentStep.progress.current"
            :total="currentStep.progress.total"
            :phase="phase"
          />

          <Transition name="fade-slide" mode="out-in">
            <AssessingState
              v-if="phase === 'assessing'"
              key="assessing"
            />

            <InsightPanel
              v-else-if="phase === 'insight' && session.lastInsight"
              key="insight"
              :insight="session.lastInsight"
              :assessment="lastAssessment"
              :assessment-error="assessmentError"
              :last-answer="lastAnswer"
              :is-last-question="currentStep?.progress.current === currentStep?.progress.total"
              @continue="continueToNext"
            />

            <QuestionCard
              v-else-if="phase === 'question' && currentStep"
              key="question"
              :question="currentStep.question"
              :draft-answer="draftAnswer"
              :selected-option="selectedOption"
              :can-submit="canSubmit()"
              @update:draft-answer="draftAnswer = $event"
              @update:selected-option="selectedOption = $event"
              @submit="submitCurrentAnswer"
            />
          </Transition>
        </div>
      </div>
    </Transition>
  </AppLayout>
</template>

<style scoped>
.session-layout {
  display: grid;
  grid-template-columns: minmax(260px, 320px) 1fr;
  gap: var(--space-lg);
  align-items: start;
}

.session-main {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  min-width: 0;
}

@media (max-width: 860px) {
  .session-layout {
    grid-template-columns: 1fr;
  }
}
</style>
