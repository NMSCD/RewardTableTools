<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDocumentStore } from '@/stores/document';
import { useRewardStore } from '@/stores/reward';
import { computed } from 'vue';
import { searchReward } from '@/logic/rewardList';
import TextLabel from '@/components/TextLabel.vue';

const documentStore = useDocumentStore();
const rewardStore = useRewardStore();
const { fileXmlDoc } = storeToRefs(documentStore);
const { productSearchTerm } = storeToRefs(rewardStore);

const results = computed(() => {
  if (!fileXmlDoc.value || !productSearchTerm.value) return [];
  const results = searchReward(fileXmlDoc.value, productSearchTerm.value);
  return results;
});
</script>

<template>
  <div v-if="productSearchTerm">
    <TextLabel>Product ID rewarded from:</TextLabel>
    <div v-if="results?.length">
      <ul class="reward-list">
        <li v-for="result in results">
          {{ result.value }}
        </li>
      </ul>
    </div>
    <div v-else>No reward found!</div>
  </div>
</template>

<style scoped>
.reward-list {
  list-style: inside;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0 1em;
}
</style>
