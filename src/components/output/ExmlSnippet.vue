<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDocumentStore } from '@/stores/document';
import { useRewardStore } from '@/stores/reward';
import { reactive, ref, watch } from 'vue';
import { searchRewardSection } from '@/logic/logic';
import TextLabel from '../TextLabel.vue';
import CopySection from '../CopySection.vue';

const documentStore = useDocumentStore();
const rewardStore = useRewardStore();
const { fileXmlDoc } = storeToRefs(documentStore);
const { rewardSearchTerm } = storeToRefs(rewardStore);
const exmlOutput = ref<HTMLPreElement | null>(null);
const exmlString = ref('');

const data = reactive({
  fileXmlDoc: fileXmlDoc,
  rewardSearchTerm: rewardSearchTerm,
  exmlOutput: exmlOutput,
});

watch(data, (newValue) => {
  const xmlString = getXmlString(newValue.fileXmlDoc, newValue.rewardSearchTerm) ?? '';
  exmlString.value = xmlString;
  if (newValue.exmlOutput) newValue.exmlOutput.innerText = xmlString;
});

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
    <pre class="exml-wrapper">
      <div class="exml" ref="exmlOutput"></div>
    <CopySection :section="exmlOutput" />
  </pre>
  </div>
</template>

<style scoped lang="scss">
.exml-wrapper {
  display: flex;
  align-items: start;
}
</style>
