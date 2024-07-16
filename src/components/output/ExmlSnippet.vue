<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRewardStore } from '@/stores/reward';
import { computed } from 'vue';
import { searchRewardSection } from '@/logic/logic';
import TextLabel from '../TextLabel.vue';
import CopySection from '../CopySection.vue';

const rewardStore = useRewardStore();
const { rewardSearchTerm, xmlDoc } = storeToRefs(rewardStore);

const exmlString = computed(() => getXmlString(xmlDoc.value.file, rewardSearchTerm.value) ?? '');

function getXmlString(dom: XMLDocument | null, rewardSearchTerm: string) {
  if (!dom || !rewardSearchTerm) return;
  const domSection = searchRewardSection(dom, rewardSearchTerm);
  if (!domSection) return;
  const serializer = new XMLSerializer();
  const xmlString = serializer.serializeToString(domSection);
  return xmlString;
}
</script>

<template>
  <div v-if="exmlString">
    <TextLabel>Reward ID EXML snippet:</TextLabel>
    <pre class="is-flex is-align-items-start">
      <div>{{ exmlString }}</div>
    <CopySection :data="exmlString" />
  </pre>
  </div>
</template>
