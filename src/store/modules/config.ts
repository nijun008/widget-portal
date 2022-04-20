import { defineStore } from 'pinia'

interface IconConfig {
  [key: string]: any
}

interface configState {
  sidebar: {
    visible: boolean,
    position: string
  },
  icon: IconConfig
}

export const useConfigStore = defineStore({
  id: 'store/config',
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage }
    ]
  },
  state: ():configState => ({
    sidebar: {
      visible: true,
      position: 'right'
    },
    icon: {
      titleVisible: false,
      radius: 10,
      baseSize: 60,
      xGap: 30,
      yGap: 30
    }
  }),
  actions: {
    setBarVisible (visible: boolean):void {
      this.sidebar.visible = visible
    },
    setBarPosition (position: string):void {
      this.sidebar.position = position
    },
    setIconTitleVisible (visible: boolean) {
      this.icon.titleVisible = visible
    },
    setIconConfig (key: string, value: boolean | string | number) {
      this.icon[key] = value
    }
  }
})
