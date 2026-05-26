<script setup>
import AppButton from './AppButton.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})

defineEmits(['action'])
</script>

<template>
  <div class="empty panel">
    <h2>{{ title }}</h2>
    <p v-if="description">{{ description }}</p>
    <AppButton v-if="$slots.action" variant="secondary" @click="$emit('action')">
      <slot name="action" />
    </AppButton>
  </div>
</template>

<style scoped>
.empty {
  text-align: center;
  max-width: 480px;
  margin: 0 auto;
}

h2 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-heading);
  margin-bottom: var(--space-sm);
}

p {
  color: var(--color-text-muted);
  margin-bottom: var(--space-lg);
}
</style>
