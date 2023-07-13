<script setup lang="ts">
import InputLabel from './input-label.vue';
import TextInput from './text-input.vue';

</script>

<template>
	<div class="field">
		<input-label inputId="rewardInput">Enter reward ID to get chances for rewards</input-label>
		<text-input type="text" input-id="rewardInput" />
	</div>
</template>