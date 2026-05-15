<script setup lang="ts">
import TextLabel from '@/components/TextLabel.vue';
import { computed } from 'vue';
import { searchReward } from '@/logic/rewardList';
import { storeToRefs } from 'pinia';
import { useRewardStore } from '@/stores/reward';

const rewardStore = useRewardStore();
const { productSearchTerm, xmlDoc, activeSource } = storeToRefs(rewardStore);

const results = computed(() => {
  const activeDoc = xmlDoc.value[activeSource.value];
  if (!activeDoc || !productSearchTerm.value) return [];
  const rewardResults = searchReward(activeDoc, productSearchTerm.value);
  return rewardResults;
});
</script>

<template>
  <div>
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
