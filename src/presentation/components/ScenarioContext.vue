<script setup>
defineProps({
  scenario: {
    type: Object,
    required: true,
  },
  collapsed: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <aside class="context-panel panel" :class="{ collapsed }">
    <p class="section-label">Scenario context</p>
    <h2>{{ scenario.title }}</h2>

    <div v-if="!collapsed" class="content">
      <p class="context">{{ scenario.context }}</p>

      <div class="goal">
        <p class="section-label">Mental model goal</p>
        <p>{{ scenario.mentalModelGoal }}</p>
      </div>

      <ul class="concept-list">
        <li v-for="concept in scenario.keyConcepts" :key="concept">{{ concept }}</li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.context-panel {
  position: sticky;
  top: 5.5rem;
}

h2 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-heading);
  margin: var(--space-xs) 0 var(--space-md);
}

.context {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--color-text);
  margin-bottom: var(--space-lg);
}

.goal {
  padding-top: var(--space-md);
  border-top: 1px solid var(--color-border);
  margin-bottom: var(--space-md);
}

.goal p:last-child {
  margin-top: var(--space-xs);
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.collapsed .content {
  display: none;
}

@media (max-width: 860px) {
  .context-panel {
    position: static;
  }

  .collapsed .content {
    display: block;
  }
}
</style>
