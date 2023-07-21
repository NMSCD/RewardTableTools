<script setup lang="ts">
import { computed, reactive, ref, type Ref } from 'vue';
import TextLabel from 'src/components/text-label.vue';
import { rewardChances, searchRewardSection } from 'src/logic/logic';
import { useRewardStore } from 'src/stores/reward';
import { storeToRefs } from 'pinia';
import { useDocumentStore } from 'src/stores/document';

const rewardStore = useRewardStore();
const documentStore = useDocumentStore();

const { exmlSnippet, recentSource, productSearchTerm, rewardSearchTerm } = storeToRefs(rewardStore);
const { fileXmlDoc } = storeToRefs(documentStore);
const chancesInputType = computed(() => recentSource.value === 'exml' ? 'Chances from EXML Snippet' : 'Reward ID Chances');	// Either "Reward ID Chances" or "Chances from EXML snippet"

const divTable = computed(() => {
	if (recentSource.value === 'exml' && exmlSnippet.value || exmlSnippet.value && !rewardSearchTerm.value) {
		const parser = new DOMParser();
		const dom = parser.parseFromString(exmlSnippet.value, 'text/xml');
		const table = rewardChances(dom, productSearchTerm.value);
		return table ?? [];
	}
	const dom = fileXmlDoc.value;

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