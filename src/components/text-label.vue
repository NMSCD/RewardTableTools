<script setup lang="ts">
defineProps<{
	inputId?: string;
}>()
</script>

<template>
	<label :for="inputId" class="label mb-1 has-text-weight-bold">
		<slot></slot>
	</label>
</template>