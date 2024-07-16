<script setup lang="ts">
import TextLabel from '@/components/TextLabel.vue';

defineProps<{
  inputId: string;
}>();

const model = defineModel({ type: String, required: true });
</script>

<template>
  <div class="field">
    <TextLabel :input-id="inputId">
      <slot></slot>
    </TextLabel>
    <div class="control">
      <input
        v-model="model"
        :id="inputId"
        class="input"
        type="text"
      />
    </div>
  </div>
</template>
