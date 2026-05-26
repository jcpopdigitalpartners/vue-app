<script setup>
import LoadingState from '../components/ui/LoadingState.vue'

defineProps({
  message: {
    type: String,
    default: 'Calibrating your mental model…',
  },
})
</script>

<template>
  <LoadingState :message="message" />
</template>
