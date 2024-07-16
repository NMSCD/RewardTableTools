<script setup lang="ts">
import ExmlSnippet from './ExmlSnippet.vue';
import ChancesTable from './ChancesTable.vue';
import RewardList from './RewardList.vue';
import { useRewardStore } from '@/stores/reward';
import { storeToRefs } from 'pinia';

const rewardStore = useRewardStore();
const { activeSource, rewardSearchTerm, productSearchTerm } = storeToRefs(rewardStore);
</script>

<template>
  <div class="is-flex is-flex-direction-column output-section">
    <div class="columns is-desktop">
      <RewardList
        v-if="productSearchTerm"
        class="column is-full"
      />
    </div>
    <div class="columns is-desktop">
      <ChancesTable
        v-if="rewardSearchTerm"
        class="column is-full-mobile"
      />
      <ExmlSnippet
        v-if="activeSource === 'file'"
        class="column is-full-mobile"
      />
    </div>
  </div>
</template>

<style scoped>
.output-section {
  gap: 1rem;
}
</style>
