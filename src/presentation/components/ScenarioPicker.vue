<script setup>
import AppBadge from './ui/AppBadge.vue'
import AppButton from './ui/AppButton.vue'
import LoadingState from './ui/LoadingState.vue'
import EmptyState from './ui/EmptyState.vue'

defineProps({
  scenarios: {
    type: Array,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select'])
</script>

<template>
  <section class="picker">
    <header class="picker-header">
      <AppBadge>Mental model lab</AppBadge>
      <h1>Choose a scenario</h1>
      <p>
        Each scenario presents a realistic situation and guided questions to help you
        construct — and stress-test — a mental model.
      </p>
    </header>

    <LoadingState v-if="isLoading" message="Loading scenarios…" />

    <EmptyState
      v-else-if="scenarios.length === 0"
      title="No scenarios found"
      description="Add a Markdown file to the scenarios folder to get started."
    />

    <ul v-else class="scenario-list">
      <li v-for="item in scenarios" :key="item.id">
        <button type="button" class="scenario-card panel" @click="$emit('select', item.id)">
          <div class="card-top">
            <h2>{{ item.title }}</h2>
            <AppBadge tone="neutral">{{ item.questions.length }} questions</AppBadge>
          </div>
          <p class="summary">{{ item.summary }}</p>
          <ul class="concept-list">
            <li v-for="concept in item.keyConcepts" :key="concept">{{ concept }}</li>
          </ul>
          <span class="card-action">Start scenario →</span>
        </button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.picker {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

h1 {
  margin-top: var(--space-md);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--color-heading);
}

.picker-header p {
  margin-top: var(--space-sm);
  color: var(--color-text-muted);
}

.scenario-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-md);
}

.scenario-card {
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    background var(--transition-base);
}

.scenario-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-strong);
  background: var(--color-bg-hover);
  box-shadow: var(--shadow-md);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
  margin-bottom: var(--space-sm);
}

h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-heading);
}

.summary {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: var(--space-md);
}

.card-action {
  display: inline-block;
  margin-top: var(--space-md);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--color-accent);
}
</style>
