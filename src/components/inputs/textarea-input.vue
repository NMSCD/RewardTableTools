<script setup lang="ts">
import TextLabel from 'src/components/text-label.vue';

defineProps<{
  modelValue: string;
}>();
</script>

<template>
  <div class="field">
    <text-label inputId="exmlInput">Paste EXML here</text-label>
    <textarea
      :value="modelValue"
      class="textarea"
      id="exmlInput"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    ></textarea>
  </div>
</template>
