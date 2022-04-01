interface ConfigState {
  sideBarVisible: boolean,
  sideBarPosition: string
}

const config = {
  namespaced: true,
  state: ():ConfigState => ({
    sideBarVisible: true,
    sideBarPosition: 'right'
  }),
  mutations: {
    setBarVisible (state: ConfigState, visible: boolean):void {
      state.sideBarVisible = visible
    },
    setBarPosition (state: ConfigState, position: string):void {
      state.sideBarPosition = position
    }
  }
}

export default config
