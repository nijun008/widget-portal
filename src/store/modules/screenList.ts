interface Icon {
  id: string,
  title: string,
  type: string,
  size: number[],
  rowfull: boolean,
  iconType: string,
  iconColor?: string,
  iconTxt?: string,
  iconUrl?: string,
  url?: string,
  libname?: string,
  sort?: number
}

interface Screen {
  sort: number,
  name: string,
  icon: string,
  iconList: Icon[]
}

interface ScreenState {
  list: Screen[]
}

const screenList = {
  namespaced: true,
  state: ():ScreenState => ({
    list: []
  }),
  mutations: {
    addScreen (state:ScreenState, screen:Screen) {
      state.list.push(screen)
    },
    removeScreen(state:ScreenState, removeIndex: number) {
      state.list.splice(removeIndex, 1)
    },
    editScreen(state:ScreenState, editIndex:number, name:string, icon:string) {
      state.list[editIndex].name = name
      state.list[editIndex].icon = icon
    },
    // sortIcon(state:ScreenState, screenIndex:number, oldIndex:number, newIndex:number) {
    //   let target = state.list[screenIndex].iconList[oldIndex]
    //   if (oldIndex !== newIndex) {
    //   }
    // },
    addIcon(state:ScreenState, screenIndex:number, icon:Icon) {
      state.list[screenIndex].iconList.push(icon)
    },
    removeIcon(state:ScreenState, screenIndex:number, iconIndex:number) {
      state.list[screenIndex].iconList.splice(iconIndex)
    },
    editIcon(state:ScreenState, screenIndex:number, iconIndex:number, icon:Icon) {
      state.list[screenIndex].iconList[iconIndex] = { ...icon }
    }
  }
}