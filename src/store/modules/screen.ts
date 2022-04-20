import { defineStore } from 'pinia'

const baseIconList = [
  { size: [3, 2], iconType: '', rowfull: false, title: '飞猪', type: 'ext_link', id: 'ext_link1231', url: 'https://www.fliggy.com/', iconSrc: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [2, 2], iconType: '', rowfull: true, title: '语雀', type: 'ext_link', id: 'ext_link1231', url: 'https://www.fliggy.com/', iconSrc: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [3, 2], iconType: '', rowfull: false, title: '第一个组件', type: 'ext_widget', id: 'FirstWidget', url: 'http://127.0.0.1:8081/FirstWidget.umd.js', libname: 'FirstWidget', iconSrc: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' },
  { size: [3, 2], iconType: '', rowfull: false, title: '第二个组件', type: 'ext_widget', id: 'FirstWidget2', url: 'http://127.0.0.1:8081/FirstWidget.umd.js', libname: 'FirstWidget', iconSrc: 'https://itab.s3.ladydaily.com/files/itab.link/logov2/avatar.png' }
]
const baseScreen = { id: '1', name: '主页', icon: '', iconList: baseIconList }
interface Icon {
  id: string,
  title: string,
  type: string,
  size: number[],
  rowfull: boolean,
  iconType: string,
  iconColor?: string,
  iconTxt?: string,
  iconSrc?: string,
  url?: string,
  libname?: string,
  sort?: number
}

interface Screen {
  // sort: number,
  id: string,
  name: string,
  icon: string,
  iconList: Icon[]
}

interface ScreenState {
  list: Screen[],
  cruuent: Screen | null,
  currentIndex: number
}

export const useScreenStore = defineStore({
  id: 'store/screen',
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage }
    ]
  },
  state: ():ScreenState => ({
    list: [baseScreen, { id: '2', name: '工具', icon: '', iconList: [] }],
    cruuent: baseScreen,
    currentIndex: 0
  }),
  actions: {
    switchScreen (index: number) {
      this.currentIndex = index
      this.cruuent = this.list[index]
    },
    addScreen (screen:Screen) {
      this.list.push({ ...screen })
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
      console.log(this.list)
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
