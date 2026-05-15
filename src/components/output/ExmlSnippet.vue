<script setup lang="ts">
import CopySection from '../CopySection.vue';
import TextLabel from '../TextLabel.vue';
import { computed } from 'vue';
import { searchRewardSection } from '@/logic/logic';
import { storeToRefs } from 'pinia';
import { useRewardStore } from '@/stores/reward';

const rewardStore = useRewardStore();
const { rewardSearchTerm, xmlDoc } = storeToRefs(rewardStore);

const exmlString = computed(() => getXmlString(xmlDoc.value.file, rewardSearchTerm.value) ?? '');

function getXmlString(dom: XMLDocument | null, searchTerm: string) {
  if (!dom || !searchTerm) return;
  const domSection = searchRewardSection(dom, searchTerm);
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
