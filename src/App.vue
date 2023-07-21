<script setup lang="ts">
import Navbar from 'src/components/navbar.vue';
import PageHeader from 'src/components/page-header.vue';
import SectionHeader from 'src/components/section-header.vue';
import InputSection from 'src/components/inputs/input-section.vue';
import OutputSection from 'src/components/output/output-section.vue';
</script>

<template>
	<navbar />
	<page-header />
	<main>
		<section id="input">
			<section-header>Input</section-header>
			<input-section />
		</section>

		<section id="output">
			<section-header>Output</section-header>
			<output-section />
		</section>
	</main>
</template>