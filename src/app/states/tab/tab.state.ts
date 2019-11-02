export interface Tab {
    url: string //later as 2d array for
    id: string
    name: string
  }
  
  export interface TabState {
    show: Tab
    list: Tab[]
  }
  
 export let initTab:Tab = {
    id:"0",
    url:"nothing",
    name:"nothing"
  }