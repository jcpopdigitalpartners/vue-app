<script setup>
import { computed } from 'vue'
import AppBadge from './ui/AppBadge.vue'
import AppButton from './ui/AppButton.vue'

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  draftAnswer: {
    type: String,
    default: '',
  },
  selectedOption: {
    type: Number,
    default: null,
  },
  canSubmit: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:draftAnswer', 'update:selectedOption', 'submit'])

const isReflection = computed(() => props.question.type === 'reflection')
</script>

<template>
  <article class="question-card panel">
    <div class="card-header">
      <AppBadge :tone="isReflection ? 'accent' : 'neutral'">
        {{ isReflection ? 'Reflection' : 'Check your model' }}
      </AppBadge>
    </div>

    <h3>{{ question.text }}</h3>

    <p v-if="question.hint" class="hint">
      <span class="hint-label">Hint</span>
      {{ question.hint }}
    </p>

    <div v-if="isReflection" class="answer-area">
      <label class="section-label" for="reflection-answer">Your reasoning</label>
      <textarea
        id="reflection-answer"
        :value="draftAnswer"
        placeholder="Work through your reasoning here. There is no single right answer — focus on the process."
        rows="6"
        @input="$emit('update:draftAnswer', $event.target.value)"
        @keydown.meta.enter.prevent="$emit('submit')"
        @keydown.ctrl.enter.prevent="$emit('submit')"
      />
      <p class="hint-keyboard">Press Ctrl+Enter to submit</p>
    </div>

    <fieldset v-else class="options">
      <legend class="section-label">Choose the best answer</legend>
      <label
        v-for="(option, index) in question.options"
        :key="index"
        class="option"
        :class="{ selected: selectedOption === index }"
      >
        <input
          type="radio"
          name="answer"
          :value="index"
          :checked="selectedOption === index"
          @change="$emit('update:selectedOption', index)"
        />
        <span class="option-index">{{ index + 1 }}</span>
        <span class="option-text">{{ option }}</span>
      </label>
    </fieldset>

    <div class="actions">
      <AppButton :disabled="!canSubmit" @click="$emit('submit')">Submit answer</AppButton>
    </div>
  </article>
</template>

<style scoped>
.question-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.45;
  color: var(--color-heading);
}

.hint {
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-accent-secondary) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent-secondary) 18%, transparent);
  color: var(--color-text);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.hint-label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-accent-secondary);
  margin-bottom: 0.25rem;
}

.answer-area {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

textarea {
  width: 100%;
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-strong);
  background: var(--color-bg);
  color: var(--color-heading);
  font-family: inherit;
  font-size: 0.9375rem;
  line-height: 1.6;
  resize: vertical;
  min-height: 160px;
  transition: border-color var(--transition-fast);
}

textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.hint-keyboard {
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.options {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.option {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: start;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition:
    border-color var(--transition-fast),
    background var(--transition-fast);
}

.option:hover {
  border-color: var(--color-border-strong);
  background: var(--color-bg-hover);
}

.option.selected {
  border-color: color-mix(in srgb, var(--color-accent) 50%, transparent);
  background: color-mix(in srgb, var(--color-accent) 8%, transparent);
}

.option input {
  margin-top: 0.25rem;
  accent-color: var(--color-accent);
}

.option-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-accent-secondary);
  background: color-mix(in srgb, var(--color-accent-secondary) 12%, transparent);
}

.option-text {
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--color-text);
}

.actions {
  padding-top: var(--space-xs);
}
</style>
