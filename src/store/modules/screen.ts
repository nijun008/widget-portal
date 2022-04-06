import { defineStore } from 'pinia'

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
  // sort: number,
  name: string,
  icon: string,
  iconList: Icon[]
}

interface ScreenState {
  list: Screen[]
}

export const useScreenStore = defineStore({
  id: 'screen',
  state: ():ScreenState => ({
    list: []
  }),
  actions: {
    addScreen (screen:Screen) {
      this.list.push(screen)
    },
    removeScreen (removeIndex: number) {
      this.list.splice(removeIndex, 1)
    },
    editScreen (editIndex:number, name:string, icon:string) {
      this.list[editIndex].name = name
      this.list[editIndex].icon = icon
    },
    addIcon (screenIndex:number, icon:Icon) {
      this.list[screenIndex].iconList.push(icon)
    },
    removeIcon (screenIndex:number, iconIndex:number) {
      this.list[screenIndex].iconList.splice(iconIndex)
    },
    editIcon (screenIndex:number, iconIndex:number, icon:Icon) {
      this.list[screenIndex].iconList[iconIndex] = { ...icon }
    }
    // moveIcon(screenIndex:number, oldIndex:number, newIndex:number) {
    //   let target = this.list[screenIndex].iconList[oldIndex]
    //   if (oldIndex !== newIndex) {
    //   }
    // },
  }
})
