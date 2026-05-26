<script setup>
import AppBadge from './ui/AppBadge.vue'
import AppButton from './ui/AppButton.vue'
import AssessmentPanel from './AssessmentPanel.vue'
import { levelLabel } from '../../application/viewModels/assessmentDisplay.js'

defineProps({
  summary: {
    type: Object,
    required: true,
  },
})

defineEmits(['restart'])
</script>

<template>
  <section class="summary">
    <header class="summary-header">
      <AppBadge tone="success">Session complete</AppBadge>
      <h1>{{ summary.title }}</h1>
      <p class="goal">{{ summary.goal }}</p>
    </header>

    <AssessmentPanel
      v-if="summary.assessment"
      :assessment="{
        score: summary.assessment.overallScore,
        level: summary.assessment.overallLevel,
        summary: summary.assessment.readinessSummary,
        strengths: [`Overall level: ${levelLabel(summary.assessment.overallLevel)}`],
        gaps: summary.assessment.focusAreas,
        calibrationNote: `Session score aggregated across ${summary.assessment.questionAssessments.length} calibrated responses.`,
        provider: summary.assessment.provider,
      }"
    />

    <div class="summary-grid">
      <article class="panel">
        <p class="section-label">Key concepts</p>
        <ul class="concept-list">
          <li v-for="concept in summary.concepts" :key="concept">{{ concept }}</li>
        </ul>
      </article>

      <article class="panel">
        <p class="section-label">Model insights covered</p>
        <ol class="insights">
          <li v-for="(insight, index) in summary.insights" :key="index">
            <span class="insight-index">{{ index + 1 }}</span>
            <span>{{ insight }}</span>
          </li>
        </ol>
      </article>
    </div>

    <AppButton block size="lg" @click="$emit('restart')">Choose another scenario</AppButton>
  </section>
</template>

<style scoped>
.summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  max-width: 760px;
  margin: 0 auto;
}

h1 {
  margin-top: var(--space-md);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--color-heading);
}

.goal {
  margin-top: var(--space-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
}

.summary-grid {
  display: grid;
  gap: var(--space-md);
}

.insights {
  list-style: none;
  margin-top: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.insights li {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-sm);
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text);
}

.insight-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 12%, transparent);
}
</style>
