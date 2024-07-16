<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  section: HTMLPreElement | null;
}>();

const isCopied = ref(false);

function copySection() {
  if (!props.section) return;
  navigator.clipboard.writeText(props.section.innerText);

  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 1500); // NoSonar wait 1.5 seconds
}

const icon = computed(() => (isCopied.value ? 'done' : 'content_copy'));
</script>

<template>
  <i
    :class="{ 'copy-success': isCopied }"
    class="material-icons copy-icon"
    @click="copySection"
    >{{ icon }}
  </i>
</template>

<style scoped>
.copy-icon {
  cursor: pointer;
  border-radius: 100%;
  padding: 0.5rem;
  transition: background-color 0.3s, color 0.3s;
  user-select: none;

  &:hover {
    background-color: silver;
  }

  &.copy-success {
    background-color: green;
    color: white;
  }
}
</style>
