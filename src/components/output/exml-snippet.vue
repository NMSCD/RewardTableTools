<script setup lang="ts">
import { storeToRefs } from 'pinia';
import TextLabel from 'src/components/text-label.vue';
import { useDocumentStore } from 'src/stores/document';
import { useRewardStore } from 'src/stores/reward';
import { reactive, ref, watch } from 'vue';
import { searchRewardSection } from 'src/logic/logic';

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
    <text-label>Reward ID EXML snippet:</text-label>
    <pre
      class="exml"
      ref="exmlOutput"
    ></pre>
  </div>
</template>
