<script setup>
defineProps({
  tone: {
    type: String,
    default: 'accent',
    validator: (value) => ['accent', 'neutral', 'success', 'warning'].includes(value),
  },
})
</script>

<template>
  <span class="badge" :class="`badge-${tone}`">
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.badge-accent {
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
}

.badge-neutral {
  color: var(--color-text-muted);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
}

.badge-success {
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 30%, transparent);
}

.badge-warning {
  color: #f59e0b;
  background: color-mix(in srgb, #f59e0b 10%, transparent);
  border: 1px solid color-mix(in srgb, #f59e0b 25%, transparent);
}
</style>
