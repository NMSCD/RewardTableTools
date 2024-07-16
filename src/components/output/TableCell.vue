<script setup lang="ts">
import { getItemData } from '@/logic/api';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  content: string;
}>();

const assistantLink = ref<string | null>(null);
const itemName = ref<string | null>(null);

onMounted(async () => {
  const data = await getItemData(props.content);
  if (!data || typeof data !== 'object' || !('link' in data) || !('name' in data)) return;
  const { name, link } = data;
  if (typeof name !== 'string' || typeof link !== 'string') return;
  assistantLink.value = link;
  itemName.value = name;
});
</script>

<template>
  <a
    v-if="assistantLink"
    :href="assistantLink"
    rel="noopener noreferrer"
    target="_blank"
    :title="itemName ?? ''"
    >{{ content }}</a
  >
  <div v-else>{{ content }}</div>
</template>
