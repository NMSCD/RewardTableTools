<script setup lang="ts">
import { useDocumentStore } from 'src/stores/document';
import { ref } from 'vue';

defineProps<{
	inputId: string;
}>()

const fileInput = ref<HTMLInputElement | null>(null);
const fileName = ref('');
const dragActive = ref(false);

const documentStore = useDocumentStore();

function updateLabel(file: File) {
	fileName.value = file.name
}

function addFile(file: File | null = null) {
	const uploadedFile = file ?? fileInput.value?.files?.[0];
	if (!uploadedFile) return;
	updateLabel(uploadedFile);
	documentStore.readFile(uploadedFile);
}

function dropFile(e: DragEvent) {
  dragActive.value = false;
  const uploadedFile = e.dataTransfer?.files?.[0];
  if (uploadedFile) addFile(uploadedFile);
}
</script>

<template>
	<div class="file has-name is-boxed">
		<label :class="{'drag-active': dragActive}" class="file-label" :for="inputId" @dragenter="dragActive = true" @dragleave="dragActive = false" @drop.prevent="dropFile" @dragover.prevent>
			<input ref="fileInput" class="file-input" type="file" :id="inputId" @change="addFile()" />
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
.file-label {
	* {
		pointer-events: none;
	}

	&.drag-active .file-cta,
	&:hover .file-cta {
		background-color: #eeeeee;
}
}

.file-icon {
	margin-right: 0;

	.file-icon-element {
		font-size: 2rem;
	}
}
</style>