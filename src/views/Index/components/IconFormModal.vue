<template>
  <n-modal :show="props.visible" >
    <div class="icon-form">
      <n-card title="添加网址" closable @close="close">
        <n-form :model="urlForm">
          <n-form-item label="网站地址"><n-input v-model:value="urlForm.url" /></n-form-item>
          <n-form-item label="网站名称"><n-input v-model:value="urlForm.name" /></n-form-item>
          <n-form-item label="选择图标">
            <div class="icon-radio-list flex">
              <div class="icon-radio-box txt-center">
                <div class="icon-radio active">
                  <div class="icon-radio-bg" :style="{ backgroundColor: '#1f80ef' }">名称</div>
                </div>
                <div>纯色图标</div>
              </div>

              <div class="icon-radio-box txt-center">
                <div class="icon-radio active">
                  <div class="icon-radio-bg" :style="{ backgroundColor: '#9b59b6' }">名称</div>
                </div>
                <div>纯色图标</div>
              </div>
            </div>
          </n-form-item>
          <n-form-item label="图标颜色">
            <n-color-picker
              :modes="['hex']"
              :show-alpha="false"
              v-model:value="urlForm.iconColor"
              :swatches="[
                '#FFFFFF',
                '#18A058',
                '#2080F0',
                '#F0A020',
                'rgba(208, 48, 80, 1)'
              ]"
            />
          </n-form-item>

          <n-form-item>
            <n-space>
              <n-button>添加</n-button>
              <n-button>添加并继续</n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-card>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const urlForm = {
  url: '',
  name: '',
  icon: '',
  iconType: '',
  iconColor: '#18A058'
}

const props = defineProps<{
  visible: boolean
}>()

const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}
</script>

<style lang="scss" scoped>
.icon-form {
  width: 600px;
}
.icon-radio-box {
  &+.icon-radio-box {
    margin-left: 10px;
  }
}
.icon-radio {
  padding: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 26px;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: 8px;
  &.active {
    border-color: #1681ff;
  }
  .icon-radio-bg {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    line-height: 64px;
    box-sizing: border-box;
  }
}
</style>
