<template>
  <n-drawer :show="props.visible" :width="400" placement="right" :on-esc="close" :on-mask-click="close">
    <div class="drawer-wrapper flex column">
      <div class="close-box" @click="close">关闭</div>
      <div class="header flex"></div>
      <div class="body flex grow">
        <div class="menu">
          <ul>
            <li @click="navClick(nav)" v-for="(nav, index) in navList" :key="index" :class="{active: currentNav === nav.id}">{{ nav.name }}</li>
          </ul>
        </div>
        <div class="content grow">
          <n-form
            v-show="currentNav === 'widgetConfig'"
            :model="widgetForm"
            label-placement="left"
            label-width="auto"
            size="small"
          >
            <n-form-item label="显示组件名称" path="showTitle">
              <n-switch :value="widgetForm.showTitle" @update:value="showTitleChange" />
            </n-form-item>

            <n-form-item label="圆角大小" path="radius">
              <div class="flex full">
                <div class="grow"><n-slider v-model:value="widgetForm.radius" :min="0" :max="maxRadius" :step="1" /></div>
                <div class="pl-12 val-box">{{widgetForm.radius}}px</div>
              </div>
            </n-form-item>

            <n-form-item label="圆角大小" path="radius">
              <div class="flex full">
                <div class="grow"><n-slider v-model:value="widgetForm.radius" :min="0" :max="maxRadius" :step="1" /></div>
                <div class="pl-12 val-box">{{widgetForm.radius}}px</div>
              </div>
            </n-form-item>

            <n-form-item label="左右间距" path="xGap">
              <div class="flex full">
                <div class="grow"><n-slider v-model:value="widgetForm.xGap" :min="10" :max="50" :step="1" /></div>
                <div class="pl-12 val-box">{{widgetForm.xGap}}px</div>
              </div>
            </n-form-item>

            <n-form-item label="上下间距" path="yGap">
              <div class="flex full">
                <div class="grow"><n-slider v-model:value="widgetForm.yGap" :min="10" :max="50" :step="1" /></div>
                <div class="pl-12 val-box">{{widgetForm.yGap}}px</div>
              </div>
            </n-form-item>
            <n-form-item label="容器宽度单位">
              <n-radio-group v-model:value="widgetForm.containerUnit" name="radiogroup">
                <n-space>
                  <n-radio value="%">百分比</n-radio>
                  <n-radio value="px">px</n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="容器最大宽度" path="containerMaxWidth">
              <div class="flex full">
                <div class="grow">
                  <n-slider v-show="widgetForm.containerUnit === 'px'" v-model:value="widgetForm.containerMaxWidth" :min="800" :max="3000" :step="1" />
                  <n-slider v-show="widgetForm.containerUnit === '%'" v-model:value="widgetForm.containerMaxWidth" :min="50" :max="100" :step="1" />
                </div>
                <div class="pl-12 val-box">{{widgetForm.containerMaxWidth}}{{ widgetForm.containerUnit }}</div>
              </div>
            </n-form-item>
          </n-form>

          <n-form
            v-show="currentNav === 'sidebarConfig'"
            :model="widgetForm"
            label-placement="left"
            label-width="auto"
            size="small"
          >
            <n-form-item label="显示侧边栏">
              <n-switch @update:value="sidebarVisibleSwitch" :value="sideBarVisible" />
            </n-form-item>
            <n-form-item label="侧边栏位置">
              <n-radio-group @update:value="sidebarPositionChange" :value="sideBarPosition" name="radiogroup">
                <n-space>
                  <n-radio value="left">左</n-radio>
                  <n-radio value="right">右</n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
          </n-form>
        </div>
      </div>
    </div>
  </n-drawer>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, reactive, computed, ref, onBeforeMount } from 'vue'
import { useConfigStore } from '@/store/modules/config'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const configStore = useConfigStore()
const sideBarPosition = computed(() => configStore.sideBarPosition)
const sidebarPositionChange = (value: string) => {
  configStore.setBarPosition(value)
}

const sideBarVisible = computed(() => configStore.sideBarVisible)
const sidebarVisibleSwitch = (value:boolean) => {
  configStore.setBarVisible(value)
}

// 组件配置
const maxRadius = computed(() => {
  return widgetForm.value.baseSize / 2
})

const widgetForm = computed(() => ({
  showTitle: configStore.iconTitleVisible,
  baseSize: 60,
  radius: 10,
  xGap: 30,
  yGap: 30,
  containerUnit: 'px',
  containerMaxWidth: 1300
}))

const showTitleChange = (value:boolean) => {
  configStore.setIconTitleVisible(value)
}

// 侧边栏配置
const sidebarForm = reactive({
  hidden: false,
  position: 'right'
})

const currentNav = ref('')
const navList = reactive([
  { name: '小组件', id: 'widgetConfig' },
  { name: '侧边栏', id: 'sidebarConfig' },
  { name: '壁纸', id: 'wallpaperConfig' },
  { name: '关于', id: 'about' }
])

onBeforeMount(() => {
  currentNav.value = navList[0].id
})

const navClick = (nav: { name: string, id: string }) => {
  currentNav.value = nav.id
}
</script>

<style lang="scss" scoped>
.drawer-wrapper {
  font-size: 13px;
  height: 100%;
  position: relative;
  .close-box {
    cursor: pointer;
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border: 2px solid #ddd;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
    right: 10px;
    bottom: 10px;
  }
  .header {
    padding: 20px;
    background-color: rgba($color: #000000, $alpha: .1);
  }
  .menu {
    ul {
      box-sizing: border-box;
      height: 100%;
      padding: 10px;
      li {
        cursor: pointer;
        padding: 8px 12px;
        &:hover {
          background-color: rgba($color: #000000, $alpha: .1);
        }
        &.active {
          background-color: rgba($color: #000000, $alpha: .2);
        }
      }
    }
  }
  .content {
    background-color: #f9f9f9;
    padding: 10px;
    .val-box {
      width: 60px;
    }
  }
}
</style>
