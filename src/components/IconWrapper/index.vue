<template>
  <div class="icon">
    <img :src="iconData.iconUrl">
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const icon = defineProps<{
  iconData: {
    title: string,
    id: string,
    type: string,
    url: string,
    iconUrl: string
  }
}>()
</script>

<style scoped lang="scss">
.icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}
</style>
