<script setup lang="ts">
import TextLabel from 'src/components/text-label.vue';
import Tooltip from 'src/components/tooltip.vue';
import FileInput from './file-input.vue';
import { useDocumentStore } from 'src/stores/document';

const documentStore = useDocumentStore();
</script>

<template>
	<div class="field">
		<div class="label-tooltip">
			<text-label inputId="fileUpload">Upload REWARDTABLE.EXML</text-label>
			<tooltip>Can be found in METADATA/REALITY/TABLES.</tooltip>
		</div>
		<file-input type="file" input-id="fileUpload" @change="documentStore.readFile($event.target)" />
	</div>
</template>

<style scoped lang="scss">
.label-tooltip {
	display: flex;
	gap: .25rem;
}
</style>