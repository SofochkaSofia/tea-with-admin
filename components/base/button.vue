<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button
    :type="type || 'button'"
    :class="[
      'px-6 py-3 rounded-lg transition font-medium',
      variant === 'primary'
        ? 'bg-primary-600 text-white hover:bg-primary-700'
        : 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      disabled && 'opacity-50 cursor-not-allowed'
    ]"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>