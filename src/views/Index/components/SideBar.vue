<template>
  <div class="sidebar-wrapper" :class="sideBarPosition">
    <div class="sidebar flex column" :class="{ hidden: !sideBarVisible }">
      <div class="user-box">
        <n-space vertical>
          <n-avatar :size="26" src="https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png"></n-avatar>
          <div class="user-name">登录</div>
        </n-space>
      </div>
      <ul class="sidebar-list grow">
        <li
          class="sidebar-item"
          :class="{ active: screen.id === (cruuentScreen && cruuentScreen.id) }"
          v-for="(screen, index) in screenList"
          :key="screen.id"
          @click="screenNavClick(index)">
          {{ screen.name }}
        </li>
        <!-- <li class="sidebar-item">站点</li>
        <li class="sidebar-item">常用</li> -->
        <n-popconfirm
          :show-icon="false"
          @positive-click="addScreenConfirm"
          @negative-click="addScrennCancel">
          <template #trigger>
            <li class="sidebar-item">添加</li>
          </template>

          <n-form-item label="名称">
            <n-input v-model:value="screenName"></n-input>
          </n-form-item>
        </n-popconfirm>
        <!-- <li class="sidebar-item" @click="emitEvent('addIcon')">添加图标</li> -->
      </ul>
      <div class="sidebar-setting">
        <div @click="emitEvent('setting')">设置</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, computed, ref } from 'vue'
import { useConfigStore } from '@/store/modules/config'
import { useScreenStore } from '@/store/modules/screen'

const configStore = useConfigStore()
const screenStore = useScreenStore()
const screenList = computed(() => screenStore.list)
const cruuentScreen = computed(() => screenStore.list[screenStore.currentIndex])

const sideBarPosition = computed(() => configStore.sidebar.position)
const sideBarVisible = computed(() => configStore.sidebar.visible)

const emit = defineEmits(['event'])

const emitEvent = (eventType:string) => {
  emit('event', eventType)
}

const screenNavClick = (index: number) => {
  screenStore.switchScreen(index)
}

const screenName = ref('')

const addScreenConfirm = () => {
  if (screenName.value && screenName.value.trim()) {
    const name = screenName.value.trim()
    screenStore.addScreen({
      id: Date.now().toString(),
      name,
      icon: '',
      iconList: []
    })

    screenName.value = ''
  }
  return false
}
const addScrennCancel = () => {
  screenName.value = ''
}

</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  position: fixed;
  z-index: 3;
  height: 100%;
  width: 50px;
  font-size: 12px;
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
    .sidebar {
      &.hidden {
        transform: translate(100%);
      }
    }
  }
  .sidebar {
    height: 100%;
    width: 100%;
    text-align: center;
    background-color: rgba(4, 4, 4, .5);
    color: #ccc;
    transition: .1s;
    &.hidden {
      transform: translate(-100%);
    }
    .user-box {
      cursor: pointer;
      padding: 50px 0;
    }
    .sidebar-list {
      li {
        padding: 10px 0;
        cursor: pointer;
        &:hover {
          background-color: rgba(4, 4, 4, .3);
        }
        &.active {
          background-color: rgba(4, 4, 4, .4);
        }
      }
    }
    .sidebar-setting {
      padding: 10px 0;
      > div {
        padding: 10px 0;
        cursor: pointer;
        &:hover {
          background-color: rgba(4, 4, 4, .4);
        }
      }
    }
  }
  &:hover {
    .hidden {
      transform: translate(0) !important;
    }
  }
}
</style>
