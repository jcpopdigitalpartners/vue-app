<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  block: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<template>
  <button
    :type="type"
    class="btn"
    :class="[`btn-${variant}`, `btn-${size}`, { 'btn-block': block }]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition:
    transform var(--transition-fast),
    opacity var(--transition-fast),
    border-color var(--transition-fast),
    background var(--transition-fast),
    box-shadow var(--transition-fast);
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.btn-block {
  width: 100%;
}

.btn-sm {
  padding: 0.45rem 0.9rem;
  font-size: 0.8125rem;
}

.btn-md {
  padding: 0.7rem 1.4rem;
  font-size: 0.9375rem;
}

.btn-lg {
  padding: 0.85rem 1.6rem;
  font-size: 1rem;
}

.btn-primary {
  border: none;
  color: #0a0a0f;
  background: var(--gradient-accent);
  box-shadow: var(--shadow-glow);
}

.btn-primary:hover:not(:disabled) {
  box-shadow: var(--shadow-glow), var(--shadow-md);
}

.btn-secondary {
  border: 1px solid var(--color-border-strong);
  background: var(--color-bg-hover);
  color: var(--color-heading);
}

.btn-secondary:hover:not(:disabled) {
  border-color: var(--color-accent);
}

.btn-ghost {
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text-muted);
}

.btn-ghost:hover:not(:disabled) {
  color: var(--color-heading);
  background: var(--color-bg-hover);
  border-color: var(--color-border);
}
</style>
