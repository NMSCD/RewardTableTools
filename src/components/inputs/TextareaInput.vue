<script setup lang="ts">
import TextLabel from '@/components/TextLabel.vue';

const model = defineModel({ type: String, required: true });
</script>

<template>
  <div class="field">
    <TextLabel inputId="exmlInput">Paste EXML here</TextLabel>
    <textarea
      v-model="model"
      class="textarea"
      id="exmlInput"
    ></textarea>
  </div>
</template>
