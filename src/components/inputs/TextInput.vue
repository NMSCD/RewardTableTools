<script setup lang="ts">
import TextLabel from '@/components/TextLabel.vue';

defineProps<{
  inputId: string;
  modelValue: string;
}>();
</script>

<template>
  <div class="field">
    <TextLabel :input-id="inputId">
      <slot></slot>
    </TextLabel>
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
