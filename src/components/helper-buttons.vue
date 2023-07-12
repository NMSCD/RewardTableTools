<script setup lang="ts">
import { ref } from 'vue';
import HelpDialog from './dialog/help-dialog.vue';

const isModalOpen = ref(false);
const helpDialog = ref(null);

const switchModalVisibility = () => isModalOpen.value = !isModalOpen.value;

</script>

<template>
	<help-dialog :open="isModalOpen" ref="helpDialog" @close-modal="switchModalVisibility" />
	<div class="helper-buttons">
		<button id="explainBtn" class="button" @click="switchModalVisibility">
			How to use
		</button>
		<button></button>
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