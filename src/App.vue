<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import PageHeader from '@/components/PageHeader.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import InputSection from '@/components/inputs/InputSection.vue';
import OutputSection from '@/components/output/OutputSection.vue';
import { onMounted } from 'vue';
import { validIds } from './logic/api';

onMounted(async () => {
  try {
    const idResponse = await fetch('https://api.nmsassistant.com/ItemInfo/GameId');
    const idResponseJson: unknown = await idResponse.json();
    if (Array.isArray(idResponseJson)) validIds.push(...idResponseJson);
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <Navbar />
  <PageHeader />
  <main>
    <section id="input">
      <SectionHeader>Input</SectionHeader>
      <InputSection />
    </section>

    <section id="output">
      <SectionHeader>Output</SectionHeader>
      <OutputSection />
    </section>
  </main>
</template>
