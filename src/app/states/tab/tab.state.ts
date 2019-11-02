export interface Page {
  name?: string
  url: string
}

export interface Tab {
    //url: string //later as 2d array for
    pages: Page[][]
    name: string
  }
  
  export interface TabState {
    show: number
    list: Tab[]
  }
  
 export let initTab:Tab = {
    pages: [[{name:'PageName',url:'http://www.google.de'},{name:'Github',url:'http://www.github.com'}]],
    name:"nothing"
  }