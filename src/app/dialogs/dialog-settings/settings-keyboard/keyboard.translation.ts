import { TypeInput } from "../../../states/keyboard";
import * as _ from 'lodash-es'
//TODO: Refactoring! In class or something else

const availableKeys: string[] = [
  "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"
]
function isAvailableKey(key:string) {
  return key.length==1 || _.includes(availableKeys,key)
}
  /**
   * Retern key in well structured format
   * 
   * @param event the dom event
   * @param isAllKeyPress if true return on every press except meta keys if false return null on meta keys
   */
export function keypressEventToTypeInput(event,isAllKeyPress:boolean=false):TypeInput {
    if(isAvailableKey(event.key) || isAllKeyPress) {
      return {
        key: event.key.toLowerCase(),
        isAlt: event.altKey,
        isCtrl: event.ctrlKey,
        isMeta: event.metaKey,
        isShift: event.shiftKey
      }
    }
    else return null
  }

export function keyboardTranslation(typeInput:TypeInput):string {
    if(typeInput==null) {
        return null
    } else {
        let str:string = ""

        if(typeInput.isShift) str+="[SHIFT] "
        if(typeInput.isCtrl) str+="[CTRL] "
        if(typeInput.isMeta) str+="[META] "
        if(typeInput.isAlt) str+="[ALT] "
        str+=typeInput.key

        return str
    }
}