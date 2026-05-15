<script setup lang="ts">
import { watch, watchEffect } from 'vue';
import FileUpload from './FileUpload.vue';
import SourceSelector from './SourceSelector.vue';
import TextInput from './TextInput.vue';
import TextareaInput from './TextareaInput.vue';
import { rewardChances } from '@/logic/logic';
import { storeToRefs } from 'pinia';
import { useRewardStore } from '@/stores/reward';

const rewardStore = useRewardStore();
const { productSearchTerm, rewardSearchTerm, exmlSnippet, xmlDoc, activeSource } = storeToRefs(rewardStore);

watchEffect(() => {
  const rewardTableEntries = xmlDoc.value[activeSource.value]?.querySelectorAll(
    '[value="GcGenericRewardTableEntry.xml"] > [name="Id"]',
  );

  if (rewardTableEntries?.length === 1) rewardSearchTerm.value = rewardTableEntries[0].getAttribute('value') ?? '';
});

watchEffect(() => {
  const currentlyActiveDoc = xmlDoc.value[activeSource.value];
  if (!currentlyActiveDoc) return;
  rewardChances(currentlyActiveDoc, productSearchTerm.value);
});

watch(exmlSnippet, processSnippet);

function processSnippet() {
  if (exmlSnippet.value) {
    rewardStore.setExml();
    rewardStore.textToDoc(exmlSnippet.value);
  } else {
    xmlDoc.value.exml = null;
    rewardStore.setFile();
  }
}
</script>

<template>
  <div class="columns is-flex-wrap-wrap mb-5">
    <div class="column is-full-mobile is-one-third-tablet is-one-quarter-desktop">
      <FileUpload />
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
      <TextareaInput v-model="exmlSnippet" />
    </div>
    <SourceSelector v-if="xmlDoc.exml && xmlDoc.file" />
  </div>
</template>
