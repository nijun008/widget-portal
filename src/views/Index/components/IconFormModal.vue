<template>
  <n-modal :show="props.visible" >
    <div class="icon-form">
      <n-card title="添加网址" closable @close="close">
        <n-form :model="urlForm" :rules="rules" ref="formRef">
          <n-form-item label="网站地址" path="url"><n-input v-model:value="urlForm.url" /></n-form-item>
          <n-form-item label="网站名称" path="name"><n-input v-model:value="urlForm.name" /></n-form-item>
          <n-form-item label="选择图标">
            <div class="icon-radio-list flex">
              <div class="icon-radio-box txt-center">
                <div class="icon-radio" :class="{ active: urlForm.iconType === 'color' }" @click="iconTypeClick('color')">
                  <div class="icon-radio-bg" :style="{ backgroundColor: urlForm.iconColor }">{{ urlForm.iconTxt }}</div>
                </div>
                <div>纯色图标</div>
              </div>

              <div class="icon-radio-box txt-center">
                <div class="icon-radio" :class="{ active: urlForm.iconType === 'img' }" @click="iconTypeClick('img')">
                  <div class="icon-radio-bg" :style="{ backgroundColor: '#9b59b6' }"></div>
                </div>
                <div>网站图标</div>
              </div>

              <div class="icon-radio-box txt-center">
                <div class="icon-radio" :class="{ active: urlForm.iconType === 'custom' }" @click="iconTypeClick('custom')">
                  <div class="icon-radio-bg" :style="{ backgroundColor: '#9b59b6' }"></div>
                </div>
                <div>自定义图标</div>
              </div>
            </div>
          </n-form-item>
          <n-form-item label="图标颜色">
            <n-color-picker
              :modes="['hex']"
              :show-alpha="false"
              v-model:value="urlForm.iconColor"
              :swatches="[
                '#18A058',
                '#33c5c5',
                '#2080F0',
                '#fbbc04',
                '#e74c3c',
                '#6c4cb9'
              ]"
            />
          </n-form-item>

          <n-form-item>
            <n-space>
              <n-button @click="saveClick">添加</n-button>
              <n-button @click="saveClick(true)">添加并继续</n-button>
            </n-space>
          </n-form-item>
        </n-form>
      </n-card>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, reactive, ref } from 'vue'
import { FormInst } from 'naive-ui'
import { useConfigStore } from '@/store/modules/config'

const configStore = useConfigStore()

const formRef = ref<FormInst | null>(null)

const urlForm = reactive({
  url: '',
  name: '',
  icon: '',
  iconType: 'color',
  iconTxt: '名称',
  iconColor: '#18A058'
})

const rules = {
  url: [{ required: true, message: '请输入URL', trigger: 'blur' }],
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
}

const props = defineProps<{
  visible: boolean
}>()

const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}

// 图标类型切换
const iconTypeClick = (iconType:string) => {
  urlForm.iconType = iconType
}

const saveClick = (goOn:boolean | undefined) => {
  (formRef.value as FormInst).validate(err => {
    if (!err) {
      console.log(urlForm)
      !goOn && close()
    } else {
      console.log(err)
    }
  })
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
