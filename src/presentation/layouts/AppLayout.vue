<script setup>
defineProps({
  phase: {
    type: String,
    required: true,
  },
  sessionTitle: {
    type: String,
    default: '',
  },
})

defineEmits(['home', 'exit'])
</script>

<template>
  <div class="app-shell">
    <div class="background-glow" aria-hidden="true" />

    <header class="site-header">
      <div class="header-start">
        <button type="button" class="brand" @click="$emit('home')">
          <img alt="" class="logo" src="../../assets/logo.svg" width="32" height="32" />
          <span>Mental Model Lab</span>
        </button>
      </div>

      <div v-if="phase !== 'pick'" class="header-center">
        <span class="section-label">Active scenario</span>
        <p class="session-title">{{ sessionTitle }}</p>
      </div>

      <div class="header-end">
        <button
          v-if="phase !== 'pick' && phase !== 'complete'"
          type="button"
          class="exit-btn"
          @click="$emit('exit')"
        >
          Exit
        </button>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="site-footer">
      <p>Scenario-driven questions to build durable mental models</p>
    </footer>
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.background-glow {
  position: fixed;
  inset: 0;
  background: var(--gradient-glow);
  pointer-events: none;
  z-index: 0;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-xl);
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-bg) 82%, transparent);
  backdrop-filter: blur(12px);
}

.header-start {
  justify-self: start;
}

.header-center {
  justify-self: center;
  text-align: center;
  min-width: 0;
}

.header-end {
  justify-self: end;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-heading);
}

.brand:hover {
  opacity: 0.85;
}

.logo {
  display: block;
}

.session-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 280px;
}

.exit-btn {
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    color var(--transition-fast),
    background var(--transition-fast),
    border-color var(--transition-fast);
}

.exit-btn:hover {
  color: var(--color-heading);
  background: var(--color-bg-hover);
  border-color: var(--color-border);
}

.main-content {
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-3xl) var(--space-xl);
}

.site-footer {
  position: relative;
  z-index: 1;
  padding: var(--space-xl);
  text-align: center;
  border-top: 1px solid var(--color-border);
}

.site-footer p {
  font-size: 0.8125rem;
  color: var(--color-text-muted);
}

@media (max-width: 720px) {
  .site-header {
    grid-template-columns: 1fr auto;
    padding: var(--space-md);
  }

  .header-center {
    display: none;
  }

  .main-content {
    padding: var(--space-2xl) var(--space-md);
  }
}
</style>
