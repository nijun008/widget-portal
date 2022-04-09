<template>
  <n-modal :show="props.visible">
    <n-card title="" closable @close="close" content-style="padding: 0;" style="max-width: 800px;">
      <template #header>
        <div class="flex middle">
          <div style="font-size: 14px;padding-right: 12px;">添加到主屏</div>
          <n-select style="width: 180px" v-model:value="screenIndex" :options="screenOptions" />

          <!-- <n-input-group>
            <n-input :style="{ width: '50%' }" />
            <n-button type="primary" ghost>搜索</n-button>
          </n-input-group> -->
        </div>
      </template>
      <div class="new-widget-modal flex">
        <div class="left-menu shrink">
          <n-menu :value="currentMenu" :options="menuOptions" @update:value="menuClick" />
        </div>

        <div class="right-content grow">

          <div class="flex icon-wrapper wrap" v-show="currentMenu !== 'custom'">
            <n-scrollbar style="max-height: 486px">
              <div class="flex icon-list wrap">
                <div class="icon-item" v-for="icon in iconData" :key="icon.id">
                  <div class="flex">
                    <div>
                      <n-avatar size="medium" :src="icon.iconSrc"/>
                    </div>
                    <div class="item-right">
                      <div class="title">{{icon.title}}</div>
                      <!-- <div class="description">{{icon.description}}</div> -->
                    </div>
                  </div>
                  <div class="description">{{icon.description}}</div>
                  <div class="flex end icon-footer"><n-button @click="addPresetIcon(icon)">添加</n-button></div>
                </div>
              </div>
            </n-scrollbar>
          </div>

          <n-form v-show="currentMenu === 'custom'" :model="urlForm" :rules="rules" ref="formRef" label-placement="left" label-width="80px">
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

        </div>
      </div>
    </n-card>
  </n-modal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, reactive, ref, computed, watch } from 'vue'
import { FormInst, FormItemRule } from 'naive-ui'
import { useConfigStore } from '@/store/modules/config'
import { useScreenStore } from '@/store/modules/screen'

const iconData = [
  {
    url: 'https://www.zhihu.com/',
    description: '一个真实的网络问答社区，帮助你寻找答案，分享知识。',
    iconName: '知乎',
    keyword: ',知乎,ZhiHu,https://www.zhihu.com/',
    title: '知乎',
    iconSrc: 'https://infinityicon.infinitynewtab.com/user-share-icon/2b89ebe968d8cafe77a5c587daa79c7f.png',
    type: ['social'],
    id: '595a178e703e23483da87842'
  },
  {
    url: 'http://weibo.com/',
    description: '国内排名最高、影响力最大的言论平台和生活空间，并创造了新的媒体革命。',
    iconName: '微博',
    keyword: 'zhalangweibo渣浪微博XinLangWeiBohttp://weibo.com/',
    title: '新浪微博',
    iconSrc: 'https://infinityicon.infinitynewtab.com/user-share-icon/0f2ab700f8fff5b6e9ebc7d6a976981f.png',
    type: ['social'],
    id: '595a178e703e23483da871b8'
  },
  {
    url: 'http://tieba.baidu.com/',
    description: '百度贴吧——全球最大的中文社区。贴吧的使命是让志同道合的人相聚。',
    iconName: '贴吧',
    keyword: '百度贴吧——全球最大的中文社区BaiDuTieBahttp://tieba.baidu.com/',
    title: '百度贴吧',
    iconSrc: 'https://infinityicon.infinitynewtab.com/user-share-icon/6eb77504f38f45d16f761662b4a1cd3e.png',
    type: ['social'],
    id: '595a178e703e23483da871a3'
  },
  {
    url: 'http://www.douban.com',
    description: '围绕文化和生活的发现工具、社区和社会媒体。提供图书、电影、音乐唱片的推荐、评论和价格比较，以及城市独特的文化生活。',
    iconName: '豆瓣',
    keyword: 'zhalangweibo渣浪微博XinLangWeiBohttp://weibo.com/',
    title: '豆瓣',
    iconSrc: 'https://infinityicon.infinitynewtab.com/user-share-icon/e9b0df13819c1029fdc4287a6a83bf6c.png',
    type: ['social', 'read'],
    id: '595a178e703e23483da871a4'
  }
]
// 添加预设地址
const addPresetIcon = (item) => {
  screenStore.addIcon(screenIndex.value, {
    url: item.url,
    title: item.title,
    iconType: 'img',
    iconSrc: item.iconSrc,
    type: 'ext_link',
    id: Date.now().toString(),
    size: [1, 1],
    rowfull: false
  })
}

// 菜单
const menuOptions = [
  { label: '自定义网址', key: 'custom' },
  { label: '小组件', key: 'widget' },
  { label: '热门', key: 'hot' },
  { label: '购物', key: 'shopping' },
  { label: '资讯', key: 'news' },
  { label: '影音', key: 'media' },
  { label: '设计', key: 'ui' },
  { label: '科技数码', key: 'science' },
  { label: '社区', key: 'social' },
  { label: '工具', key: 'tool' }
]
const menuClick = (value:string) => {
  console.log(value)
  currentMenu.value = value
}
const currentMenu = ref('hot')

const props = defineProps<{
  visible: boolean
}>()

const configStore = useConfigStore()
const screenStore = useScreenStore()

// 主屏选项
const screenOptions = computed(() => {
  return screenStore.list.map((item, index) => ({ label: item.name, value: index }))
})

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

// 当前主屏下标
const currentIndex = computed(() => screenStore.currentIndex)
const screenIndex = ref(currentIndex.value)
watch(currentIndex, (value) => {
  screenIndex.value = value
})

// 图标表单弹框关闭
const emits = defineEmits(['close'])
const close = () => {
  emits('close')
  resetForm()
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
      screenStore.addIcon(screenIndex.value, {
        ...urlForm,
        url: urlForm.href,
        type: 'ext_link',
        id: Date.now().toString(),
        size: [1, 1],
        rowfull: false
      })
      close()
    } else {
      console.log(err)
    }
  })
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
</script>

<style lang="scss">
:icon {
  --icon-gap: 14px; /* 图标列表间隙 */
}
</style>
<style lang="scss" scoped>
.new-widget-modal {
  .left-menu {}
  .right-content {
    box-sizing: border-box;
    padding: 0 var(--icon-gap) var(--icon-gap) var(--icon-gap);
    .icon-wrapper {
      background-color: #f7f7f7;
      border-radius: 8px;
      min-height: 100%;
    }
    .icon-list {
      padding: var(--icon-gap) 0 0 var(--icon-gap);
      .icon-item {
        border-radius: 8px;
        width: calc(33.3% - var(--icon-gap));
        box-sizing: border-box;
        background-color: #fff;
        padding: var(--icon-gap);
        margin-right: var(--icon-gap);
        margin-bottom: var(--icon-gap);
        .description {
            font-size: 13px;
            color: #8f8f8f;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        .item-right {
          padding-left: 10px;
          .title {
            line-height: 34px;
          }
        }
        .icon-footer {
          margin-top: 10px;
        }
      }
    }
  }
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
