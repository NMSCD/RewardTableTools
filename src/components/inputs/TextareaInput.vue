<script setup lang="ts">
import TextLabel from '@/components/TextLabel.vue';

defineProps<{
  modelValue: string;
}>();
</script>

<template>
  <div class="field">
    <TextLabel inputId="exmlInput">Paste EXML here</TextLabel>
    <textarea
      :value="modelValue"
      class="textarea"
      id="exmlInput"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    ></textarea>
  </div>
</template>
