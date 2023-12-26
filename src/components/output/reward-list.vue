<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDocumentStore } from 'src/stores/document';
import { useRewardStore } from 'src/stores/reward';
import { computed } from 'vue';
import { searchReward } from 'src/logic/rewardList';
import TextLabel from 'src/components/text-label.vue';

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
    <text-label>Product ID rewarded from:</text-label>
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

<style scoped lang="scss">
.reward-list {
  list-style: inside;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0 1em;
}
</style>
