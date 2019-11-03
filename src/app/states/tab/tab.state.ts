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
    pages: [[{name:'PageName',url:'https://www.greifhaus.de/infos/'},{name:'Github',url:'https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp'}],[{name:'PageName',url:'https://www.greifhaus.de/infos/'},{name:'Github',url:'https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp'},{name:'Github',url:'https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp'}],[{name:'Github',url:'https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp'}]],
    name:"nothing"
  }