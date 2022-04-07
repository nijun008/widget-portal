import { defineStore } from 'pinia'

export const useConfigStore = defineStore({
  id: 'config',
  state: () => ({
    sideBarVisible: true,
    sideBarPosition: 'right'
  }),
  actions: {
    setBarVisible (visible: boolean):void {
      this.sideBarVisible = visible
    },
    setBarPosition (position: string):void {
      this.sideBarPosition = position
    }
  }
})
