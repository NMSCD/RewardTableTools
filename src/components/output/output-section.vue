<script setup lang="ts">
import ExmlSnippet from './exml-snippet.vue';
import ChancesTable from './chances-table.vue';
import RewardList from './reward-list.vue';
</script>

<template>
  <div class="is-flex is-flex-direction-column output-section">
    <div class="columns is-desktop">
      <reward-list class="column is-full" />
    </div>
    <div class="columns is-desktop">
      <chances-table class="column is-full-mobile" />
      <exml-snippet class="column is-full-mobile" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.output-section {
  gap: 1rem;
}
</style>
