<template>
  <div class="page-wrapper home-page-wrapper">
    <Wallpaper />
    <Sidebar @event="sidebarEvent" />
    <Drawer :visible="drawerVisbile" @close="drawerClose" />
    <NewWidgetModal :visible="iconFormVisible"  @close="formModalClose" />

    <div class="app-main">
      <div class="header">header</div>
      <div class="app-widget" @contextmenu="contentMenuTrigger">
        <!-- 主屏轮播 -->
        <n-carousel
          direction="vertical"
          :touchable="false"
          :show-dots="false"
          :loop="false"
          :mousewheel="true"
          :current-index="currentScreenIndex"
          @update:current-index="screenChange">
          <n-carousel-item v-for="(screen) in screenList" :key="screen.id" >
            <div class="widgets-scroll">
              <div class="widgets-container" v-if="screen.iconList && screen.iconList.length > 0">
                <!-- 主屏拖拽 -->
                <draggable
                  :list="screen.iconList"
                  @start="moveStart"
                  @end="moveEnd"
                  item-key="id"
                  tag="transition-group"
                  v-bind="dragOptions"
                  :component-data="{
                    name:'fade',
                    type: 'transition-group'
                  }">
                  <template #item="{element}">
                    <ItemContainer :item-data="element" :key="element.id" />
                  </template>
                </draggable>
              </div>
              <div v-else>添加组件</div>
            </div>
          </n-carousel-item>
        </n-carousel>
      </div>
      <div class="footer">footer </div>
    </div>

    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      size="small"
      :animated="false"
      :x="contentMenuX"
      :y="contentMenuY"
      :options="contentMenuOptions"
      :show="contentMenuVisible"
      :on-clickoutside="contentMenuClickoutside"
      @select="contentMenuSelected"
    />
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { reactive, ref, computed } from 'vue'
import { useScreenStore } from '@/store/modules/screen'

import ItemContainer from '@/components/ItemContainer/index.vue'
import Wallpaper from './components/Wallpaper.vue'
import Sidebar from './components/Sidebar.vue'
import Drawer from './components/Drawer.vue'
import NewWidgetModal from './components/NewWidgetModal.vue'
import useContentMenu from './useContentMenu'

const contentMenuSelected = (target: string | number) => {
  contentMenuClose()
  switch (target) {
    case 'setting':
      drawerVisbile.value = true
      break
    case 'addIcon':
      iconFormVisible.value = true
      break
    default:
      break
  }
}

const {
  contentMenuX,
  contentMenuY,
  contentMenuVisible,
  contentMenuOptions,
  contentMenuTrigger,
  contentMenuClickoutside,
  contentMenuClose
} = useContentMenu()

const screenStore = useScreenStore()

const screenList = computed(() => screenStore.list)
const currentScreenIndex = computed(() => screenStore.currentIndex)
const screenChange = (cruuentIndex: number) => {
  if (cruuentIndex >= 0 && cruuentIndex < screenList.value.length) {
    screenStore.switchScreen(cruuentIndex)
  }
}

const drag = ref(false)
const iconFormVisible = ref(false)
const formModalClose = () => {
  iconFormVisible.value = false
}

const sidebarEvent = (eventType:string) => {
  switch (eventType) {
    case 'setting':
      drawerVisbile.value = true
      break
    case 'addIcon':
      iconFormVisible.value = true
      break
    default:
      break
  }
}

const moveStart = (e) => {
  console.log(e)
  drag.value = true
}

const moveEnd = (e) => {
  console.log(e)
  drag.value = false
}

const dragOptions = {
  animation: 200,
  disabled: false
}

// 抽屉
const drawerVisbile = ref(false)
const drawerClose = () => {
  drawerVisbile.value = false
}

</script>

<style lang="scss" scoped>
.home-page-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
  .app-main {
    position: relative;
    z-index: 2;
    height: 100%;
    .header {
      height: 50px;
      text-align: center;
    }
    .footer {
      text-align: center;
      height: 50px;
    }
    .app-widget {
      height: calc(100% - 100px);
      max-width: var(--container-max-width);
      position: relative;
      margin: 0 auto;
      padding: 0 50px;
      .widgets-scroll {
        height: 100%;
        // overflow-y: auto;
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        &::-webkit-scrollbar {
          width: 0 !important
        }
        .widgets-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, calc(var(--icon-size) + var(--icon-gap-x)));
          grid-template-rows: repeat(auto-fill,  calc(var(--icon-size) + var(--icon-gap-y)));
          grid-auto-flow: dense;
          justify-content: center;
        }
      }
    }
  }
}
</style>
