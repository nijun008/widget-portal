<template>
  <div class="page-wrapper home-page-wrapper">
    <Wallpaper />
    <Sidebar @event="sidebarEvent" />

    <div class="app-main">
      <div class="header">header</div>
      <div class="app-widget">
        <n-carousel direction="vertical" :mousewheel="true">
          <div class="widgets-scroll">
            <div class="widgets-container">
              <draggable
                :list="widgetList"
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
          </div>

          <div class="widgets-scroll">
            <div class="widgets-container">
              <draggable
                :list="widgetList"
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
          </div>
        </n-carousel>
      </div>
      <div class="footer">footer</div>
    </div>

    <Drawer :visible="drawerVisbile" @close="drawerClose" />
    <IconFormModal :visible="iconFormVisible" @close="formModalClose" />
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { reactive, ref } from 'vue'

import ItemContainer from '@/components/ItemContainer/index.vue'
import Wallpaper from './components/Wallpaper.vue'
import Sidebar from './components/Sidebar.vue'
import Drawer from './components/Drawer.vue'
import IconFormModal from './components/IconFormModal.vue'

const widgetList = reactive([
  { size: [3, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link1231', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [3, 2], rowfull: false, title: '第一个组件', type: 'ext_widget', id: 'FirstWidget', url: 'http://127.0.0.1:8081/FirstWidget.umd.js', libname: 'FirstWidget', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [3, 2], rowfull: false, title: '第二个组件', type: 'ext_widget', id: 'FirstWidget2', url: 'http://127.0.0.1:8081/FirstWidget.umd.js', libname: 'FirstWidget', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_1vlink122231', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link12131', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link51231', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [3, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link122131', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link12731', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [4, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link1c231', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [4, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_alink12gg31', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link612ag31', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link1126431', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [4, 3], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_lin3k162431', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [3, 3], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link212431', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_l15fink212431', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' }
])

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
