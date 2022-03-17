<template>
  <component v-if="mode" :is="mode"></component>
</template>

<script setup lang="ts">
import { shallowRef, defineProps, onMounted } from 'vue'

const props = defineProps<{
  widgetData: {
    libname: string,
    url: string
  }
}>()

const mode = shallowRef(null)

onMounted(() => {
  loadScript().then(() => {
    if ((window as any)[props.widgetData.libname]) {
      mode.value = (window as any)[props.widgetData.libname]
    }
  }).catch(err => {
    console.log(err)
  })
})

const loadScript = () => {
  return new Promise((resolve, reject) => {
    if ((window as any)[props.widgetData.libname]) {
      resolve((window as any)[props.widgetData.libname])
    }
    const script = document.createElement('script')
    const target = document.getElementsByTagName('script')[0] || document.head
    script.type = 'module'
    script.src = props.widgetData.url
    script.onload = resolve
    script.onerror = reject
    ;(target.parentNode as HTMLElement).insertBefore(script, target)
  })
}
</script>
