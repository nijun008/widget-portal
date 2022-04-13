<template>
  <div class="item-container" :class="`item-container_${itemData.size[0]}_${itemData.size[1]}`">
    <div class="item-box" :class="`item-box_${itemData.size[0]}_${itemData.size[1]}`">
      <WidgetWrapper v-if="itemData.type === 'ext_widget'" :widgetData="itemData" />
      <IconWrapper v-if="itemData.type === 'ext_link'" :iconData="itemData" />
    </div>
    <div v-show="showTitle" class="item-title ellip">{{ itemData.title }}</div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, watch } from 'vue'
import WidgetWrapper from '@/components/WidgetWrapper/index.vue'
import IconWrapper from '@/components/IconWrapper/index.vue'
import { useConfigStore } from '@/store/modules/config'

const props = defineProps<{
  itemData: {
    rowFull: boolean,
    title: string,
    id: string,
    type: string,
    url: string,
    iconSrc: string,
    libname?: string,
    size: number[]
  }
}>()

const configStore = useConfigStore()

// 图标标题
const showTitle = computed(() => configStore.icon.titleVisible)
// 图标单位尺寸
const baseSize = computed(() => configStore.icon.baseSize)
watch(baseSize, (val) => {
  if (val && val >= 30) {
    document.documentElement.style.setProperty('--icon-size', val + 'px')
  }
})

// 图标圆角
const radius = computed(() => configStore.icon.radius)
watch(radius, (val) => {
  document.documentElement.style.setProperty('--icon-radius', (val || 0) + 'px')
})

// 图标间隙x
const xGap = computed(() => configStore.icon.xGap)
watch(xGap, (val) => {
  document.documentElement.style.setProperty('--icon-gap-x', (val || 0) + 'px')
})

// 图标间隙y
const yGap = computed(() => configStore.icon.yGap)
watch(yGap, (val) => {
  document.documentElement.style.setProperty('--icon-gap-y', (val || 0) + 'px')
})
</script>

<style lang="scss" scoped>
.item-container {
  // width: var(--icon-size);
  // height: var(--icon-size);
  // background-color: rgba($color: #000000, $alpha: .5);
  // padding-left: var(--icon-gap-x);
  // padding-top: var(--icon-gap-y);
  box-sizing: border-box;
  padding: calc(var(--icon-gap-y) / 2) calc(var(--icon-gap-x) / 2);
  position: relative;
  .item-title {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    bottom: -8px;
    font-size: 13px;
    color: #fff;
    cursor: default;
  }
}
.item-box {
  width: var(--icon-size);
  height: var(--icon-size);
  background-color: rgba($color: #fff, $alpha: 1);
  border-radius: var(--icon-radius);
  overflow: hidden;
}
@for $x from 1 to 11 {
  @for $y from 1 to 7 {
    .item-container_#{$x}_#{$y} {
      grid-column: span #{$x};
      grid-row: span #{$y};
      width: calc(var(--icon-size) * $x + var(--icon-gap-x) * $x);
      height: calc(var(--icon-size) * $y + var(--icon-gap-y) * $y);
    }
  }
}

@for $x from 1 to 30 {
  @for $y from 1 to 20 {
    .item-box_#{$x}_#{$y} {
      grid-column: span #{$x};
      grid-row: span #{$y};
      width: calc(var(--icon-size) * $x + var(--icon-gap-x) * ($x - 1));
      height: calc(var(--icon-size) * $y + var(--icon-gap-y) * ($y - 1));
    }
  }
}
</style>
