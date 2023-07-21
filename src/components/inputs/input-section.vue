<script setup lang="ts">
import FileUpload from './file-upload.vue';
import TextareaInput from './textarea-input.vue';
import TextInput from './text-input.vue';
import { useRewardStore } from 'src/stores/reward';
import { storeToRefs } from 'pinia';
import { processEXML, rewardChances } from 'src/logic/logic';
import { watch } from 'vue';

const rewardStore = useRewardStore();
const { productSearchTerm, rewardSearchTerm, exmlSnippet } = storeToRefs(rewardStore);

watch(exmlSnippet, (newValue) => {
	if (newValue && productSearchTerm.value) searchSnippet(newValue, productSearchTerm.value);
})

function searchSnippet(exml: string, productSearchTerm: string) {
	if (!exml) return;
	const snippetXmlDoc = processEXML(exml);		// populate xmlDoc variable
	rewardChances(snippetXmlDoc, productSearchTerm);
}

</script>

<template>
	<div class="columns is-flex-wrap-wrap mb-5">
		<div class="column is-full-mobile is-one-third-tablet is-one-quarter-desktop">
			<file-upload @input="rewardStore.setFile" />
		</div>
		<div class="column is-full-mobile is-two-thirds-tablet is-one-third-desktop">
			<text-input input-id="productInput" v-model="productSearchTerm">Enter your wanted Product ID</text-input>
			<text-input input-id="rewardInput" v-model="rewardSearchTerm">Enter reward ID to get chances for
				rewards</text-input>
		</div>

		<div class="column is-full-mobile">
			<textarea-input v-model="exmlSnippet" @input="rewardStore.setExml" />
		</div>
	</div>
</template>