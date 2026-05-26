<script setup>
import AppBadge from './ui/AppBadge.vue'
import AppButton from './ui/AppButton.vue'

defineProps({
  scenario: {
    type: Object,
    required: true,
  },
})

defineEmits(['begin', 'back'])
</script>

<template>
  <section class="briefing">
    <header class="briefing-header">
      <AppBadge>Scenario briefing</AppBadge>
      <h1>{{ scenario.title }}</h1>
      <p class="summary">{{ scenario.summary }}</p>
    </header>

    <div class="briefing-grid">
      <article class="panel context-panel">
        <p class="section-label">Situation</p>
        <p class="context">{{ scenario.context }}</p>
      </article>

      <aside class="sidebar">
        <article class="panel goal-panel">
          <p class="section-label">Mental model goal</p>
          <p>{{ scenario.mentalModelGoal }}</p>
        </article>

        <article class="panel meta-panel">
          <p class="section-label">Key concepts</p>
          <ul class="concept-list">
            <li v-for="concept in scenario.keyConcepts" :key="concept">{{ concept }}</li>
          </ul>
        </article>

        <article class="panel meta-panel">
          <p class="section-label">Session format</p>
          <ul class="format-list">
            <li>
              <strong>{{ scenario.questions.length }}</strong> guided questions
            </li>
            <li>Reflection prompts and knowledge checks</li>
            <li>AI-calibrated assessment after each answer</li>
            <li>Insights revealed and scored against the model</li>
          </ul>
        </article>
      </aside>
    </div>

    <div class="actions">
      <AppButton variant="ghost" @click="$emit('back')">Back to scenarios</AppButton>
      <AppButton size="lg" @click="$emit('begin')">Begin questions</AppButton>
    </div>
  </section>
</template>

<style scoped>
.briefing {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

h1 {
  margin-top: var(--space-md);
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-heading);
}

.summary {
  margin-top: var(--space-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
}

.briefing-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--space-lg);
  align-items: start;
}

.context-panel {
  min-height: 280px;
}

.context {
  margin-top: var(--space-sm);
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text);
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.goal-panel p:last-child,
.meta-panel p:last-child {
  margin-top: var(--space-sm);
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text);
}

.format-list {
  margin-top: var(--space-sm);
  padding-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.format-list strong {
  color: var(--color-heading);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-sm);
  padding-top: var(--space-md);
}

@media (max-width: 860px) {
  .briefing-grid {
    grid-template-columns: 1fr;
  }
}
</style>
