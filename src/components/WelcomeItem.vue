<template>
  <article class="item">
    <div class="icon-wrap">
      <slot name="icon"></slot>
    </div>
    <div class="details">
      <h3>
        <slot name="heading"></slot>
      </h3>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </article>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(8px);
  transition:
    transform var(--transition-base),
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    background var(--transition-base);
}

.item:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-strong);
  background: var(--color-bg-hover);
  box-shadow: var(--shadow-md);
}

.icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  color: var(--color-accent);
  background: color-mix(in srgb, var(--color-accent) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent) 20%, transparent);
}

.icon-wrap :deep(svg) {
  width: 22px;
  height: 22px;
}

h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: var(--space-xs);
  color: var(--color-heading);
}

.content {
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--color-text);
}
</style>
