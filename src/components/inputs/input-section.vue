<script setup lang="ts">
import FileUpload from './file-upload.vue';
import TextareaInput from './textarea-input.vue';
import TextInput from './text-input.vue';
import { useRewardStore } from 'src/stores/reward';
import { storeToRefs } from 'pinia';

const rewardStore = useRewardStore();
const { productSearchTerm, rewardSearchTerm, exmlSnippet } = storeToRefs(rewardStore);

</script>

<template>
	<div class="columns is-flex-wrap-wrap mb-5">
		<div class="column is-full-mobile is-one-third-tablet is-one-quarter-desktop">
			<file-upload />
		</div>
		<div class="column is-full-mobile is-two-thirds-tablet is-one-third-desktop">
			<text-input input-id="productInput" v-model="productSearchTerm">Enter reward ID to get chances for
				rewards</text-input>
			<text-input input-id="rewardInput" v-model="rewardSearchTerm">Enter your wanted Product ID</text-input>
		</div>

		<div class="column is-full-mobile">
			<textarea-input v-model="exmlSnippet" />
		</div>
	</div>
</template>