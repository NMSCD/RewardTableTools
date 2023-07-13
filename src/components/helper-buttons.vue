<script setup lang="ts">
import { ref } from 'vue';
import HelpDialog from './dialog/help-dialog.vue';
import { useRewardStore } from 'src/stores/reward';

const rewardStore = useRewardStore()

const isModalOpen = ref(false);

const switchModalVisibility = () => isModalOpen.value = !isModalOpen.value;
const reset = () => rewardStore.$reset();


</script>

<template>
	<help-dialog :open="isModalOpen" @close-modal="switchModalVisibility" />
	<div class="helper-buttons">
		<button id="explainBtn" class="button" @click="switchModalVisibility">
			How to use
		</button>
		<button class="button is-warning" id="reset" @click="reset">Reset data</button>
	</div>
</template>

<style scoped lang="scss">
.helper-buttons {
	margin-block-end: 1em;

	button {
		margin-inline-end: 1em;
	}
}
</style>