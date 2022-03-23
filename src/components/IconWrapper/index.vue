<template>
  <div class="icon" @click="iconClick">
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

const iconClick = () => {
  if (icon.iconData.url) {
    window.open(icon.iconData.url, '_blank')
  }
}
</script>

<style scoped lang="scss">
.icon {
  width: 100%;
  height: 100%;
  // border-radius: 8px;
  // overflow: hidden;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
