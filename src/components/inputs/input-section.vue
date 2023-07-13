<script setup lang="ts">
import FileUpload from './file-upload.vue';
import ProductInput from './product-input.vue';
import RewardInput from './reward-input.vue';
import TextareaInput from './textarea-input.vue';
</script>

<template>
	<div class="columns is-flex-wrap-wrap mb-5">
		<div class="column is-full-mobile is-one-third-tablet is-one-quarter-desktop">
			<file-upload />
		</div>
		<div class="column is-full-mobile is-two-thirds-tablet is-one-third-desktop">
			<product-input />
			<reward-input />
		</div>

		<div class="column is-full-mobile">
			<textarea-input />
		</div>
	</div>
</template>