<script setup lang="ts">
import { ref } from 'vue';
import TextLabel from 'src/components/text-label.vue';

const chancesInputType = ref('');	// Either "Reward ID Chances" or "Chances from EXML snippet"
</script>

<template>
	<div>
		<text-label>
			{{ chancesInputType }}:
		</text-label>
		<div id="chancesTable"></div>
	</div>
</template>