<script setup lang="ts">
defineProps<{
	inputId: string;
}>()
</script>

<template>
	<label :for="inputId" class="label input-label">
		<slot></slot>
	</label>
</template>

<style scoped lang="scss">
.input-label {
	font-weight: bold;
	margin-bottom: 3px;
}
</style>