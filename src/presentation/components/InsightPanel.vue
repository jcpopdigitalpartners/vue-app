<script setup>
import AppBadge from './ui/AppBadge.vue'
import AppButton from './ui/AppButton.vue'
import AssessmentPanel from './AssessmentPanel.vue'

defineProps({
  insight: {
    type: String,
    required: true,
  },
  assessment: {
    type: Object,
    default: null,
  },
  assessmentError: {
    type: String,
    default: null,
  },
  lastAnswer: {
    type: Object,
    default: null,
  },
  isLastQuestion: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['continue'])
</script>

<template>
  <article class="insight-card panel panel-accent">
    <AssessmentPanel v-if="assessment" :assessment="assessment" />

    <p v-if="assessmentError" class="assessment-error">{{ assessmentError }}</p>

    <div class="card-header">
      <AppBadge tone="success">Model insight</AppBadge>
      <AppBadge v-if="lastAnswer?.isCorrect === true" tone="success">Correct</AppBadge>
      <AppBadge v-else-if="lastAnswer?.isCorrect === false" tone="warning">Review</AppBadge>
    </div>

    <blockquote class="insight">{{ insight }}</blockquote>

    <AppButton variant="secondary" @click="$emit('continue')">
      {{ isLastQuestion ? 'View summary' : 'Next question' }}
    </AppButton>
  </article>
</template>

<style scoped>
.insight-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.card-header {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.assessment-error {
  font-size: 0.875rem;
  color: #f59e0b;
}

.insight {
  margin: 0;
  padding-left: var(--space-md);
  border-left: 3px solid var(--color-accent);
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--color-heading);
}
</style>
