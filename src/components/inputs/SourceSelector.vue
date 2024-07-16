<script setup lang="ts">
import { useRewardStore } from '@/stores/reward';
import { storeToRefs } from 'pinia';
import TextLabel from '../TextLabel.vue';

const rewardStore = useRewardStore();
const { activeSource } = storeToRefs(rewardStore);
</script>

<template>
  <div class="column is-full-mobile is-flex is-flex-direction-column radio-wrapper">
    <TextLabel>Source:</TextLabel>
    <div class="source-radio is-flex">
      <label>
        <input
          v-model="activeSource"
          name="source"
          type="radio"
          value="file"
          checked
        />
        <span>File</span>
      </label>
      <label>
        <input
          v-model="activeSource"
          name="source"
          type="radio"
          value="exml"
        />
        <span>EXML</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.source-radio {
  gap: 1rem;

  label {
    display: flex;
    gap: 0.25rem;
  }
}

@media (width >= 769px) {
  .radio-wrapper {
    flex-grow: unset;
    justify-content: center;
  }

  .source-radio {
    flex-direction: column;
    gap: 0.25rem;
  }
}
</style>
