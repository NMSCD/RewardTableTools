<script setup lang="ts">
import TextLabel from '@/components/TextLabel.vue';
import Tooltip from '@/components/Tooltip.vue';
import FileInput from './FileInput.vue';
</script>

<template>
  <div class="field">
    <div class="label-tooltip">
      <TextLabel inputId="fileUpload">Upload REWARDTABLE.EXML</TextLabel>
      <Tooltip>Can be found in METADATA/REALITY/TABLES.</Tooltip>
    </div>
    <FileInput
      input-id="fileUpload"
      type="file"
    />
  </div>
</template>

<style scoped lang="scss">
.label-tooltip {
  display: flex;
  gap: 0.25rem;
}
</style>
