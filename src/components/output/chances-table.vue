<script setup lang="ts">
import { computed, reactive, type Ref } from 'vue';
import TextLabel from 'src/components/text-label.vue';
import { rewardChances, searchRewardSection } from 'src/logic/logic';
import { useRewardStore } from 'src/stores/reward';
import { storeToRefs } from 'pinia';
import { useDocumentStore } from 'src/stores/document';

const rewardStore = useRewardStore();
const documentStore = useDocumentStore();

const { exmlSnippet, recentSource, productSearchTerm, rewardSearchTerm } = storeToRefs(rewardStore);
const { fileXmlDoc } = storeToRefs(documentStore);
const chancesInputType = recentSource.value === 'exml' ? 'Chances from EXML Snippet' : 'Reward ID Chances';	// Either "Reward ID Chances" or "Chances from EXML snippet"
const source = reactive<{ [key: string]: Ref<XMLDocument | string | undefined> }>({
	exml: exmlSnippet,
	file: fileXmlDoc,
})


const divTable = computed(() => {
	const keys = Object.keys(source);
	const currentSource = recentSource.value
	const currentSourceIndex = keys.findIndex(key => key === currentSource);
	const backupSource = keys[keys.length - 1 - currentSourceIndex];
	const activeSource = source[recentSource.value] || source[backupSource];
	if (!activeSource) return [];

	let dom: XMLDocument | undefined = undefined;
	if (recentSource.value === 'exml') {
		const parser = new DOMParser();
		dom = parser.parseFromString(source[recentSource.value].value as string, 'text/xml');
	} else {
		dom = fileXmlDoc.value;
	}
	const rewardElement = searchRewardSection(dom, rewardSearchTerm.value);
	if (!rewardElement) return [];
	const table = rewardChances(rewardElement, productSearchTerm.value);
	return table ?? [];
})


</script>

<template>
	<div v-if="divTable?.length">
		<text-label>
			{{ chancesInputType }}:
		</text-label>
		<div id="chancesTable">
			<div v-for="cell in divTable" :class="cell.htmlClass ?? null">{{ cell.content }}</div>
		</div>
	</div>
</template>