<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDocumentStore } from '@/stores/document';
import { useRewardStore } from '@/stores/reward';
import { computed, reactive } from 'vue';
import { searchRewardSection } from '@/logic/logic';
import TextLabel from '../TextLabel.vue';
import CopySection from '../CopySection.vue';

const documentStore = useDocumentStore();
const rewardStore = useRewardStore();
const { fileXmlDoc } = storeToRefs(documentStore);
const { rewardSearchTerm } = storeToRefs(rewardStore);

const data = reactive({
  fileXmlDoc: fileXmlDoc,
  rewardSearchTerm: rewardSearchTerm,
});

const exmlString = computed(() => getXmlString(data.fileXmlDoc, data.rewardSearchTerm) ?? '');

function getXmlString(fileXmlDoc: XMLDocument | null, rewardSearchTerm: string) {
  if (!fileXmlDoc || !rewardSearchTerm) return;
  const domSection = searchRewardSection(fileXmlDoc, rewardSearchTerm);
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
