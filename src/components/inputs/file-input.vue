<script setup lang="ts">
import { onMounted, ref } from 'vue';

defineProps<{
	inputId: string;
}>()

const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref('');

function updateLabel() {
	if (fileInput.value?.files && fileInput.value.files.length > 0) {
		fileName.value = fileInput.value.files[0].name
	}
}

</script>

<template>
	<div class="file has-name is-boxed">
		<label class="file-label">
			<input ref="fileInput" class="file-input" type="file" :id="inputId" @change="updateLabel">
			<span class="file-cta">
				<span class="file-icon">
					<i class="material-icons file-icon-element">upload</i>
				</span>
				<span class="file-label">
					Choose a file...
				</span>
			</span>
			<span class="file-name">
				{{ fileName }}
			</span>
		</label>
	</div>
</template>

<style scoped lang="scss">
.file-icon {
	margin-right: 0;

	.file-icon-element {
		font-size: 2rem;
	}
}
</style>