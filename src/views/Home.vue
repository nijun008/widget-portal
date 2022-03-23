<template>
  <div class="page-wrapper home-page-wrapper">
    <div class="wallpaper-box"></div>
    <div style="height: 70px;"></div>
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
    <!-- <div class="item-list-container">
      <ItemContainer v-for="widget in widgetList"  :key="widget.id" :item-data="widget" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { reactive, ref } from 'vue'
// import WidgetWrapper from '@/components/WidgetWrapper/index.vue'
import ItemContainer from '@/components/ItemContainer/index.vue'

const widgetList = reactive([
  { size: [3, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link1231', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [3, 3], rowfull: false, title: '第一个组件', type: 'ext_widget', id: 'FirstWidget', url: 'http://127.0.0.1:8081/FirstWidget.umd.js', libname: 'FirstWidget', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '第二个组件', type: 'ext_widget', id: 'FirstWidget2', url: 'http://127.0.0.1:8081/FirstWidget.umd.js', libname: 'FirstWidget', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_1vlink122231', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link12131', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link51231', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [3, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link122131', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link12731', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link1c231', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_alink12gg31', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link612ag31', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link1126431', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [1, 1], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_lin3k162431', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [1, 1], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link212431', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [1, 1], rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_l15fink212431', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' }
])

const drag = ref(false)

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
</script>

<style lang="scss" scoped>
.widgets-container {
  max-width: var(--container-max-width);
  height: calc(100% - 100px);
  // height: calc(var(--icon-size) * 8 + var(--icon-gay-y) * 9);
  // width: calc(var(--icon-size) * 12 + var(--icon-gay-x) * 10);
  display: grid;
  grid-template-columns: repeat(auto-fill, calc(var(--icon-size) + var(--icon-gap-x)));
  grid-template-rows: repeat(auto-fill,  calc(var(--icon-size) + var(--icon-gap-y)));
  grid-auto-flow: dense;
  justify-content: center;
  // gap: var(--icon-gap-x) var(--icon-gap-y);
}
.test {
  width: var(--icon-size);
}
.home-page-wrapper {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.wallpaper-box {
  position: absolute;
  height: 140%;
  width: 140%;
  left: -20%;
  top: -20%;
  z-index: -1;
  background-size: cover;
  background-position: center center;
  background-image: url('https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1639402477084-7e98f693c98a?ixid=MnwxMjA3fDB8MXx0b3BpY3x8Ym84alFLVGFFMFl8fHx8fDJ8fDE2NDA4NjQwMTM&ixlib=rb-1.2.1&w=2560&fm=jpg');
  filter: blur(var(--wallpaper-blur));
}
</style>
