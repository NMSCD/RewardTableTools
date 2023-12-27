<script setup lang="ts">
import { ref } from 'vue';
import HelpDialogue from './dialog/HelpDialogue.vue';
import { useRewardStore } from '@/stores/reward';

const rewardStore = useRewardStore();

const isModalOpen = ref(false);

const switchModalVisibility = () => (isModalOpen.value = !isModalOpen.value);
const reset = () => rewardStore.$reset();
</script>

<template>
  <HelpDialogue
    :open="isModalOpen"
    @close-modal="switchModalVisibility"
  />
  <div class="helper-buttons">
    <button
      class="button"
      id="explainBtn"
      @click="switchModalVisibility"
    >
      How to use
    </button>
    <button
      id="reset"
      class="button is-warning"
      @click="reset"
    >
      Reset data
    </button>
  </div>
</template>

<style scoped lang="scss">
.helper-buttons {
  margin-block-end: 1em;

  button {
    margin-inline-end: 1em;
  }
}
</style>
