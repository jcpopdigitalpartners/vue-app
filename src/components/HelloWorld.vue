<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="hero-content">
    <span class="badge">Vue 3 + Vite</span>
    <h1>{{ msg }}</h1>
    <p class="subtitle">
      A modern starter with reactive components, fast HMR, and a polished UI out of the box.
    </p>
    <div class="actions">
      <a class="btn btn-primary" href="https://vuejs.org/guide/introduction.html" target="_blank" rel="noopener">
        Get started
      </a>
      <a class="btn btn-secondary" href="https://vite.dev/" target="_blank" rel="noopener">
        Learn Vite
      </a>
    </div>
  </div>
</template>

<style scoped>
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-lg);
  max-width: 640px;
  margin: 0 auto;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
}

h1 {
  font-size: clamp(2.25rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  background: var(--gradient-accent);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  max-width: 520px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
  margin-top: var(--space-sm);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.7rem 1.4rem;
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 600;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-base),
    background var(--transition-base);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  color: #0a0a0f;
  background: var(--gradient-accent);
  box-shadow: var(--shadow-glow);
}

.btn-primary:hover {
  color: #0a0a0f;
  box-shadow: var(--shadow-glow), var(--shadow-md);
}

.btn-secondary {
  color: var(--color-heading);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-strong);
}

.btn-secondary:hover {
  color: var(--color-heading);
  background: var(--color-bg-hover);
  border-color: var(--color-border-strong);
}
</style>
