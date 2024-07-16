<script setup lang="ts">
import { ref } from 'vue';
import HelpDialogue from './dialog/HelpDialogue.vue';
import { useRewardStore } from '@/stores/reward';

const rewardStore = useRewardStore();
const reset = () => rewardStore.$reset();

const dialogElement = ref<HTMLDialogElement | null>(null);

const openModal = () => dialogElement.value?.showModal();
const closeModal = () => dialogElement.value?.close();
</script>

<template>
  <dialog
    class="modal-content box m-auto p-0"
    ref="dialogElement"
    @click.self="closeModal"
  >
    <HelpDialogue />
  </dialog>
  <div class="mb-4">
    <button
      class="button mr-4"
      @click="openModal"
    >
      How to use
    </button>
    <button
      class="button is-warning mr-4"
      @click="reset"
    >
      Reset data
    </button>
  </div>
</template>

<style scoped>
dialog {
  max-width: 640px;
  display: none;
  margin-block-start: 5vh !important;
  border: 1px solid #80808080;

  &[open] {
    display: block;
  }
}
</style>
