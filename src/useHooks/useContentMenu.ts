import { ref, nextTick } from 'vue'

export default function UseContentMenu () {
  const contentMenuX = ref(0)
  const contentMenuY = ref(0)
  const contentMenuVisible = ref(false)

  const contentMenuClickoutside = () => {
    contentMenuVisible.value = false
  }

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
    contentMenuClose,
    contentMenuTrigger,
    contentMenuClickoutside
  }
}
