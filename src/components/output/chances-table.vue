<script setup lang="ts">
import { computed } from 'vue';
import TextLabel from 'src/components/text-label.vue';
import { rewardChances, searchRewardSection } from 'src/logic/logic';
import { useRewardStore } from 'src/stores/reward';
import { storeToRefs } from 'pinia';
import { useDocumentStore } from 'src/stores/document';

const rewardStore = useRewardStore();
const documentStore = useDocumentStore();

const { exmlSnippet, recentSource, productSearchTerm, rewardSearchTerm } = storeToRefs(rewardStore);
const { fileXmlDoc } = storeToRefs(documentStore);

const activeSource = computed(() => recentSource.value === 'exml' && exmlSnippet.value || exmlSnippet.value && !rewardSearchTerm.value ? 'exml' : 'file');
const chancesInputType = computed(() => activeSource.value === 'exml' ? 'Chances from EXML Snippet' : 'Reward ID Chances');	// Either "Reward ID Chances" or "Chances from EXML snippet"

const divTable = computed(() => {
	if (activeSource.value === 'exml') {
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
	<div v-if="rewardSearchTerm">
		<text-label>
			{{ chancesInputType }}:
		</text-label>
		<div v-if="divTable?.length" class="chancesTable">
			<div v-for="cell in divTable" :class="cell.htmlClass ?? null">{{ cell.content }}</div>
		</div>
		<div v-else>
			Reward not found!
		</div>
	</div>
</template>

<style scoped lang="scss">
.chancesTable {
	display: grid;
	grid-template-columns: 0.1fr 1.5fr 1fr 0.3fr;
	border: 1px solid black;

	&>* {
		border: 1px solid black;
		padding: 0 2px;
		white-space: nowrap;
	}

	&>.rarity {
		padding-inline-start: 1rem;
	}

	&>.size {
		padding-inline-start: 3rem;
	}

	&>.mark {
		background-color: yellow;
		color: black;
	}

	&>.rarity,
	&>.size {
		grid-column: 1 / span 4;
		font-weight: bold;

		&::after {
			content: ':';
		}
	}

	.rarity~.rarity:not(.rarity + .rarity) {
		display: none;
	}
}
</style>