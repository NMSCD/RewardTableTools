<script setup lang="ts">
import { ref } from 'vue';

const chancesInputType = ref('');
</script>

<template>
	<div>
		<label>
			{{ chancesInputType }}:
		</label>
		<div id="chancesTable"></div>
	</div>
</template>