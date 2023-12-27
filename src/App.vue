<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import PageHeader from '@/components/PageHeader.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import InputSection from '@/components/inputs/InputSection.vue';
import OutputSection from '@/components/output/OutputSection.vue';
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
