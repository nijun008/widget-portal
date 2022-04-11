import { ref, nextTick } from 'vue'

export default function UseContentMenu () {
  const contentMenuX = ref(0)
  const contentMenuY = ref(0)
  const contentMenuVisible = ref(false)

  const contentMenuOptions = [
    { label: '添加小组件', key: 'addIcon' },
    { label: '切换壁纸', key: 'changeWallpaper' },
    { label: '设置', key: 'setting' }
  ]
  const contentMenuClickoutside = () => {
    contentMenuVisible.value = false
  }

  // const contentMenuSelected = (target: string | number) => {
  //   // console.log(target)
  // }

  const contentMenuTrigger = (e:MouseEvent) => {
    e.preventDefault()
    contentMenuVisible.value = false

    nextTick().then(() => {
      contentMenuX.value = e.clientX
      contentMenuY.value = e.clientY
      contentMenuVisible.value = true
    })
  }

  const contentMenuClose = () => {
    contentMenuVisible.value = false
  }

  return {
    contentMenuX,
    contentMenuY,
    contentMenuVisible,
    contentMenuOptions,
    contentMenuClose,
    contentMenuTrigger,
    contentMenuClickoutside
  }
}
