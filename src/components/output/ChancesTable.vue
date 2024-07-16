<script setup lang="ts">
import { computed } from 'vue';
import TextLabel from '@/components/TextLabel.vue';
import { rewardChances, searchRewardSection } from '@/logic/logic';
import { useRewardStore } from '@/stores/reward';
import { storeToRefs } from 'pinia';

const rewardStore = useRewardStore();
const { activeSource, productSearchTerm, rewardSearchTerm, xmlDoc } = storeToRefs(rewardStore);

const chancesInputType = computed(() =>
  activeSource.value === 'exml' ? 'Chances from EXML Snippet' : 'Reward ID Chances'
);

const divTable = computed(() => {
  const dom = xmlDoc.value[activeSource.value];

  const rewardElement = searchRewardSection(dom, rewardSearchTerm.value);
  if (!rewardElement) return [];

  const table = rewardChances(rewardElement, productSearchTerm.value);
  return table ?? [];
});
</script>

<template>
  <div>
    <TextLabel>{{ chancesInputType }}:</TextLabel>
    <div
      v-if="divTable?.length"
      class="chancesTable"
    >
      <div
        v-for="cell in divTable"
        :class="cell.htmlClass ?? null"
      >
        {{ cell.content }}
      </div>
    </div>
    <div v-else>Reward not found!</div>
  </div>
</template>

<style scoped>
.chancesTable {
  display: grid;
  grid-template-columns: repeat(4, auto);
  border: 1px solid black;

  & > * {
    border: 1px solid black;
    padding-inline: 3px;
    white-space: nowrap;
  }

  & > .rarity {
    padding-inline-start: 1rem;
  }

  & > .size {
    padding-inline-start: 3rem;
  }

  & > .mark {
    background-color: yellow;
    color: black;
  }

  & > .rarity,
  & > .size {
    grid-column: 1 / span 4;
    font-weight: bold;

    &::after {
      content: ':';
    }
  }

  .rarity ~ .rarity:not(.rarity + .rarity) {
    display: none;
  }
}
</style>
