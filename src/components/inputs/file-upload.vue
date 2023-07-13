<script setup lang="ts">
import InputLabel from './input-label.vue';
import Tooltip from 'src/components/tooltip.vue';
import FileInput from './file-input.vue';
</script>

<template>
	<div class="field">
		<div class="label-tooltip">
			<input-label inputId="fileUpload">Upload REWARDTABLE.EXML</input-label>
			<tooltip>Can be found in METADATA/REALITY/TABLES.</tooltip>
		</div>
		<file-input type="file" input-id="fileUpload" />
	</div>
</template>

<style scoped lang="scss">
.label-tooltip {
	display: flex;
	gap: .25rem;
}
</style>