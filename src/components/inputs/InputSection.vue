<script setup lang="ts">
import FileUpload from './FileUpload.vue';
import TextareaInput from './TextareaInput.vue';
import TextInput from './TextInput.vue';
import { useRewardStore } from '@/stores/reward';
import { storeToRefs } from 'pinia';
import { processEXML, rewardChances } from '@/logic/logic';
import { watch } from 'vue';

const rewardStore = useRewardStore();
const { productSearchTerm, rewardSearchTerm, exmlSnippet } = storeToRefs(rewardStore);

watch(exmlSnippet, (newValue) => {
  if (newValue && productSearchTerm.value) searchSnippet(newValue, productSearchTerm.value);
});

function searchSnippet(exml: string, productSearchTerm: string) {
  if (!exml) return;
  const snippetXmlDoc = processEXML(exml); // populate xmlDoc variable
  rewardChances(snippetXmlDoc, productSearchTerm);
}
</script>

<template>
  <div class="columns is-flex-wrap-wrap mb-5">
    <div class="column is-full-mobile is-one-third-tablet is-one-quarter-desktop">
      <FileUpload @input="rewardStore.setFile" />
    </div>
    <div class="column is-full-mobile is-two-thirds-tablet is-one-third-desktop">
      <TextInput
        input-id="productInput"
        v-model="productSearchTerm"
        >Enter your wanted Product ID
      </TextInput>
      <TextInput
        input-id="rewardInput"
        v-model="rewardSearchTerm"
        >Enter reward ID to get chances for rewards
      </TextInput>
    </div>

    <div class="column is-full-mobile">
      <TextareaInput
        v-model="exmlSnippet"
        @input="rewardStore.setExml"
      />
    </div>
  </div>
</template>
