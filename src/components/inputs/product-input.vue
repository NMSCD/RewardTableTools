<script setup lang="ts">
import InputLabel from './input-label.vue';
import TextInput from './text-input.vue';
</script>

<template>
	<div class="field">
		<input-label inputId="productInput">Enter your wanted Product ID</input-label>
		<text-input type="text" input-id="productInput" />
	</div>
</template>