<script setup lang="ts">
defineProps<{
	inputId: string;
}>()
</script>

<template>
	<div class="control">
		<input type="text" class="input" :id="inputId">
	</div>
</template>