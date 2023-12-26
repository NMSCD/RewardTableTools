<script setup lang="ts">
import TextLabel from '@/components/text-label.vue';

defineProps<{
  inputId: string;
  modelValue: string;
}>();
</script>

<template>
  <div class="field">
    <text-label :input-id="inputId">
      <slot></slot>
    </text-label>
    <div class="control">
      <input
        :id="inputId"
        :value="modelValue"
        class="input"
        type="text"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>
