<template>
  <div class="icon" @click="iconClick">
    <div
      class="icon-bg flex middle center"
      v-if="iconData.iconType === 'color'"
      :style="{ backgroundColor: iconData && iconData.iconColor }">
      <span class="txt-center ellip">{{ iconData.iconTxt }}</span>
    </div>
    <img v-else :src="iconData.iconSrc">
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
    iconType: string,
    iconSrc?: string,
    iconColor?: string,
    iconTxt?: string,
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
  .icon-bg {
    font-size: 16px;
    color: #fff;
    width: 100%;
    height: 100%;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
