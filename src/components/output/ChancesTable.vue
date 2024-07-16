<script setup lang="ts">
import { computed } from 'vue';
import TextLabel from '@/components/TextLabel.vue';
import { rewardChances, searchRewardSection } from '@/logic/logic';
import { useRewardStore } from '@/stores/reward';
import { storeToRefs } from 'pinia';
import TableCell from './TableCell.vue';

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
  <div v-if="rewardSearchTerm">
    <TextLabel>{{ chancesInputType }}:</TextLabel>
    <div
      v-if="divTable?.length"
      class="chancesTable"
    >
      <TableCell
        v-for="cell in divTable"
        :class="cell.htmlClass ?? null"
        :content="cell.content"
      />
    </div>
    <div v-else>Reward not found!</div>
  </div>
</template>

<style scoped>
.chancesTable {
  display: grid;
  grid-template-columns: repeat(4, auto);
  border: 1px solid var(--bulma-body-color);

  & > * {
    border: 1px solid var(--bulma-body-color);
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

    &:not(a) {
      color: black;
    }
  }

  & > .rarity,
  & > .size {
    grid-column: 1 / span 4;
    font-weight: bold;

    &::after {
      content: ':';
    }
  }

  /* selects .rarity with a directly following .rarity sibling, or where .rarity is the last child */
  .rarity {
    &:has(+ .rarity),
    &:last-child {
      display: none;
    }
  }
}
</style>
