<template>
  <div class="item-container">
    <WidgetWrapper v-if="itemData.type === 'ext_widget'" :widgetData="itemData" />
    <IconWrapper v-if="itemData.type === 'ext_link'" :iconData="itemData" />
  </div>
</template>

<script lang="ts" setup>
import WidgetWrapper from '@/components/WidgetWrapper/index.vue'
import IconWrapper from '../IconWrapper/index.vue'

import { defineProps } from 'vue'

const props = defineProps<{
  itemData: {
    rowFull: boolean,
    title: string,
    id: string,
    type: string,
    url: string,
    iconUrl: string,
    libname?: string
  }
}>()
</script>

<style lang="scss" scoped>
.item-container {
  padding: 20px;
}
</style>
