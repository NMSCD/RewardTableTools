<script setup lang="ts">
import CloseButton from './CloseButton.vue';

const functionalities = [
  'Search the entire REWARDTABLE for a specific Product ID',
  'Search for a specific reward ID and display the chances of its individual rewards',
  'Paste an EXML snippet of a reward and get the chances of the individual rewards',
];
</script>

<template>
  <div class="p-4">
    <p>This web app has multiple functionalities:</p>
    <ul>
      <li v-for="functionality in functionalities">
        {{ functionality }}
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
    <CloseButton />
  </div>
</template>

<style scoped>
form {
  display: flex;
  justify-content: space-around;
}

ul {
  list-style: inside;
  margin: 0.2rem 0;
}

p:not(:first-child) {
  margin-bottom: 1rem;
}
</style>
