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

// interface ConfigState {
//   sideBarVisible: boolean,
//   sideBarPosition: string
// }

// const config = {
//   namespaced: true,
//   state: ():ConfigState => ({
//     sideBarVisible: true,
//     sideBarPosition: 'right'
//   }),
//   mutations: {
//     setBarVisible (state: ConfigState, visible: boolean):void {
//       state.sideBarVisible = visible
//     },
//     setBarPosition (state: ConfigState, position: string):void {
//       state.sideBarPosition = position
//     }
//   }
// }

// export default config
