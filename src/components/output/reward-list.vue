<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDocumentStore } from 'src/stores/document';
import { useRewardStore } from 'src/stores/reward';
import { computed } from 'vue';
import { searchReward } from 'src/logic/logic';
import TextLabel from 'src/components/text-label.vue';

const documentStore = useDocumentStore();
const rewardStore = useRewardStore();
const { fileXmlDoc } = storeToRefs(documentStore);
const { productSearchTerm } = storeToRefs(rewardStore);

const results = computed(() => {
	if (!fileXmlDoc.value || !productSearchTerm.value) return [];
	const results = searchReward(fileXmlDoc.value, productSearchTerm.value);
	if(results?.length) rewardStore.setActive();
	return results;
})
</script>

<template>
	<div>
		<text-label>Product ID rewarded from:</text-label>
		<ul id="rewardList">
			<li v-for="result in results">
				{{ result.value }}
			</li>
		</ul>
	</div>
</template>