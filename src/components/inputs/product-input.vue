<script setup lang="ts">
import { useRewardStore } from 'src/stores/reward';
import InputLabel from './input-label.vue';
import TextInput from './text-input.vue';

const rewardStore = useRewardStore();
</script>

<template>
	<div class="field">
		<input-label inputId="productInput">Enter your wanted Product ID</input-label>
		<text-input type="text" input-id="productInput" @input="rewardStore.updateProductId($event.target.value)" />
	</div>
</template>