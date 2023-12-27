<script setup lang="ts">
import { ref, watch } from 'vue';
import CloseButton from './CloseButton.vue';

const props = defineProps<{
  open: boolean;
}>();

const dialogElement = ref<HTMLDialogElement | null>(null);

watch(
  () => props.open,
  (newState) => {
    if (newState === true && dialogElement.value) dialogElement.value.showModal();
  }
);

const functionalities = [
  {
    text: 'Search the entire REWARDTABLE for a specific Product ID',
  },
  {
    text: 'Search for a specific reward ID and display the chances of its individual rewards',
  },
  {
    text: 'Paste an EXML snippet of a reward and get the chances of the individual rewards',
  },
];
</script>

<template>
  <dialog
    ref="dialogElement"
    id="explanation"
    class="modal-content"
  >
    <p>This web app has multiple functionalities:</p>
    <ul>
      <li v-for="functionality in functionalities">
        {{ functionality.text }}
      </li>
    </ul>
    <p>
      To get started, you need the REWARDTABLE.EXML file. It can either be found in METADATA/REALITY/TABLES of your
      unpacked game files, or alternatively at the same path in the
      <a
        href="https://github.com/Lenni009/nms-archive"
        rel="noopener noreferrer"
        target="_blank"
        title="nms-archive"
        >NMS EXML Archive</a
      >.
    </p>
    <p>
      To find out what item a specific product ID corresponds to, or to find the product ID of a specific item, you can
      use the
      <a
        href="https://app.nmsassistant.com/catalogue"
        rel="noopener noreferrer"
        target="_blank"
        title="Assistant for NMS"
        >Assistant for NMS web app</a
      >. On every item is a "&lt;&gt;" icon in the top left of the in-game icon. When clicked, it displays the "GameId".
    </p>
    <p>You don't need to upload the REWARDTABLE.EXML if you are using the "Paste EXML" input.</p>
    <CloseButton @close-modal="$emit('closeModal')" />
  </dialog>
</template>

<style scoped lang="scss">
dialog {
  margin-top: 5vh !important;
  border-radius: 7px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02);
  border: 1px solid lightgrey;

  form {
    display: flex;
    justify-content: space-around;
  }

  ul {
    list-style: inside;
    margin: 0.2em 0;
  }

  p:not(:first-child) {
    margin-bottom: 1em;
  }
}
</style>
