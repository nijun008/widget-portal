<template>
  <div class="page-wrapper">
    <div class="item-list-container">
      <ItemContainer v-for="widget in widgetList"  :key="widget.id" :item-data="widget" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
// import WidgetWrapper from '@/components/WidgetWrapper/index.vue'
import ItemContainer from '@/components/ItemContainer/index.vue'

const widgetList = reactive([
  { rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link1231', url: 'https://www.fliggy.com/', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { rowfull: false, title: '第一个组件', type: 'ext_widget', id: 'FirstWidget', url: 'http://127.0.0.1:8081/FirstWidget.umd.js', libname: 'FirstWidget', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { rowfull: false, title: '第二个组件', type: 'ext_widget', id: 'FirstWidget2', url: 'http://127.0.0.1:8081/FirstWidget.umd.js', libname: 'FirstWidget', iconUrl: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' }
])
</script>

<style lang="scss" scoped>
.item-list-container {
  display: flex;
}
</style>
