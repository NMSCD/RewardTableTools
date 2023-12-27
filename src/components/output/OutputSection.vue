<script setup lang="ts">
import ExmlSnippet from './ExmlSnippet.vue';
import ChancesTable from './ChancesTable.vue';
import RewardList from './RewardList.vue';
</script>

<template>
  <div class="is-flex is-flex-direction-column output-section">
    <div class="columns is-desktop">
      <RewardList class="column is-full" />
    </div>
    <div class="columns is-desktop">
      <ChancesTable class="column is-full-mobile" />
      <ExmlSnippet class="column is-full-mobile" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.output-section {
  gap: 1rem;
}
</style>
