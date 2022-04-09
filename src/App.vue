<template>
  <n-config-provider class="config-provider" :locale="zhCN"  :theme="theme">
    <router-view />
  </n-config-provider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { zhCN, darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

const theme = ref<GlobalTheme | null>(null)
</script>

<style lang="scss">
@import url('./styles/global.scss');

html, body, #app, .config-provider {
  height: 100vh;
}
</style>
