<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  phase: {
    type: String,
    default: 'question',
  },
})

const percent = computed(() => Math.round((props.current / props.total) * 100))

const phaseLabel = computed(() => {
  if (props.phase === 'assessing') return 'Calibrating assessment'
  if (props.phase === 'insight') return 'Reviewing insight'
  return 'Answering question'
})
</script>

<template>
  <div class="progress panel">
    <div class="progress-meta">
      <div>
        <span class="section-label">{{ phaseLabel }}</span>
        <p class="count">Question {{ current }} of {{ total }}</p>
      </div>
      <span class="percent">{{ percent }}%</span>
    </div>

    <div class="progress-track">
      <div class="progress-fill" :style="{ width: `${percent}%` }" />
    </div>

    <div class="steps" aria-hidden="true">
      <span
        v-for="step in total"
        :key="step"
        class="step"
        :class="{
          complete: step < current,
          active: step === current,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.progress {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.progress-meta {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-md);
}

.count {
  margin-top: 0.15rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-heading);
}

.percent {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-accent);
}

.progress-track {
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--color-border);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--gradient-accent);
  transition: width var(--transition-base);
}

.steps {
  display: flex;
  gap: 0.35rem;
}

.step {
  flex: 1;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-border);
  transition: background var(--transition-base);
}

.step.complete {
  background: color-mix(in srgb, var(--color-accent) 55%, transparent);
}

.step.active {
  background: var(--color-accent);
}
</style>
