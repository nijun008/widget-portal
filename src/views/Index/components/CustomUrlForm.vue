<template>
  <n-form :model="urlForm" :rules="rules" ref="formRef" label-placement="left" label-width="80px">
    <n-form-item label="网站地址" path="url"><n-input v-model:value="urlForm.url" maxlength="50" /></n-form-item>
    <n-form-item label="网站名称" path="title"><n-input v-model:value="urlForm.title" @update:value="nameInput" maxlength="10" /></n-form-item>
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
          '#33c5c5',
          '#2080F0',
          '#fbbc04',
          '#e74c3c',
          '#6c4cb9'
        ]"
      />
    </n-form-item>

    <n-form-item label=" ">
      <n-space>
        <n-button type="primary" @click="saveClick">添 加</n-button>
        <!-- <n-button @click="saveClick(true)">添加并继续</n-button> -->
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import { FormInst, FormItemRule } from 'naive-ui'
import { ref, reactive, defineProps } from 'vue'
import { useScreenStore } from '@/store/modules/screen'
import { WidgetTypes } from '@/consts/index'

const screenStore = useScreenStore()

const props = defineProps<{
  screenIndex: number,
  close: any
}>()

const formRef = ref<FormInst | null>(null)

// 表单
const urlForm = reactive({
  url: '',
  title: '',
  icon: '',
  iconType: 'color',
  iconTxt: '名称',
  iconColor: '#33c5c5',
  href: ''
})
// 表单验证
const rules = {
  url: [
    // { required: true, message: '请输入URL', trigger: 'blur' },
    { required: true, validator: validateUrl, message: '请输入正确的URL', trigger: 'blur' }
  ],
  title: [{ required: true, message: '请输入名称', trigger: 'blur' }]
}

// 网站名称输入
const nameInput = (value:string) => {
  if (value && value.trim().length > 0) {
    urlForm.iconTxt = value
  } else {
    urlForm.iconTxt = ''
  }
}

function validateUrl (rule: FormItemRule, value: string):boolean | Error {
  if (!value || !value.trim()) {
    return new Error('请输入URL')
  }
  let urlObj
  try {
    urlObj = new URL(value)
  } catch (err) {
    try {
      urlObj = new URL(`https://${value}`)
    } catch (err) {
      return false
    }
  }
  const { origin, href } = urlObj
  if (origin !== 'null' && href.length > 7) {
    urlForm.href = href
    return true
  }
  return false
}

// 清空表单
const resetForm = () => {
  urlForm.url = ''
  urlForm.title = ''
  urlForm.icon = ''
  urlForm.iconType = 'color'
  urlForm.iconTxt = '名称'
  urlForm.iconColor = '#33c5c5'
  urlForm.href = ''
}

// 图标类型切换
const iconTypeClick = (iconType:string) => {
  urlForm.iconType = iconType
}

// 图标保存
const saveClick = () => {
  (formRef.value as FormInst).validate(err => {
    if (!err) {
      screenStore.addIcon(props.screenIndex, {
        ...urlForm,
        url: urlForm.href,
        type: WidgetTypes.Link,
        id: Date.now().toString(),
        size: [1, 1],
        rowfull: false
      })
      props.close()
    } else {
      console.log(err)
    }
  })
}
</script>

<style scoped lang="scss">
.icon-radio-box {
  &+.icon-radio-box {
    margin-left: 10px;
  }
}
.icon-radio {
  padding: 4px;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  box-sizing: border-box;
  border: 2px solid transparent;
  border-radius: 8px;
  &.active {
    border-color: #1681ff;
  }
  .icon-radio-bg {
    overflow: hidden;
    width: 64px;
    height: 64px;
    border-radius: 8px;
    line-height: 64px;
    box-sizing: border-box;
  }
}
</style>
