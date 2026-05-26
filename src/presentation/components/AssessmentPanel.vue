<script setup>
import { computed } from 'vue'
import AppBadge from './ui/AppBadge.vue'
import { levelLabel } from '../../application/viewModels/assessmentDisplay.js'

const props = defineProps({
  assessment: {
    type: Object,
    required: true,
  },
})

const tone = computed(() => {
  if (props.assessment.level === 'strong' || props.assessment.level === 'solid') {
    return 'success'
  }
  if (props.assessment.level === 'partial') {
    return 'warning'
  }
  return 'neutral'
})
</script>

<template>
  <section class="assessment panel">
    <div class="header">
      <div>
        <p class="section-label">AI-calibrated assessment</p>
        <p class="summary">{{ assessment.summary }}</p>
      </div>
      <div class="score-block" :aria-label="`Score ${assessment.score} out of 100`">
        <span class="score">{{ assessment.score }}</span>
        <span class="score-label">/ 100</span>
      </div>
    </div>

    <div class="meta">
      <AppBadge :tone="tone">{{ levelLabel(assessment.level) }}</AppBadge>
      <span class="provider">via {{ assessment.provider }}</span>
    </div>

    <div class="score-track" aria-hidden="true">
      <div class="score-fill" :style="{ width: `${assessment.score}%` }" />
    </div>

    <div v-if="assessment.strengths.length" class="list-block">
      <p class="list-title">Strengths</p>
      <ul>
        <li v-for="item in assessment.strengths" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div v-if="assessment.gaps.length" class="list-block gaps">
      <p class="list-title">Gaps to close</p>
      <ul>
        <li v-for="item in assessment.gaps" :key="item">{{ item }}</li>
      </ul>
    </div>

    <p class="calibration">{{ assessment.calibrationNote }}</p>
  </section>
</template>

<style scoped>
.assessment {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.header {
  display: flex;
  justify-content: space-between;
  gap: var(--space-lg);
}

.summary {
  margin-top: var(--space-xs);
  color: var(--color-heading);
  line-height: 1.6;
}

.score-block {
  flex-shrink: 0;
  text-align: right;
}

.score {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
}

.score-label {
  display: block;
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.meta {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.provider {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: capitalize;
}

.score-track {
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-border);
  overflow: hidden;
}

.score-fill {
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--gradient-accent);
}

.list-block ul {
  margin-top: var(--space-xs);
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: var(--color-text);
  font-size: 0.875rem;
  line-height: 1.5;
}

.list-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.gaps .list-title {
  color: #f59e0b;
}

.calibration {
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--color-text-muted);
  padding-top: var(--space-xs);
  border-top: 1px solid var(--color-border);
}
</style>
