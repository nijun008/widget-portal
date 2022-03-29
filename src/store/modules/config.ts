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
    setBarVisible (state: ConfigState, visible: boolean) {
      state.sideBarVisible = visible
    },
    setBarPosition (state: ConfigState, position: string) {
      state.sideBarPosition = position
    }
  }
}

export default config
