import { TypeInput } from "../../../states/keyboard";

export function keyboardTranslation(typeInput:TypeInput):string {
    if(typeInput==null) return "no key"
    
    let str:string = ""

    if(typeInput.isShift) str+="[SHIFT] "
    if(typeInput.isCtrl) str+="[CTRL] "
    if(typeInput.isMeta) str+="[META] "
    str+=typeInput.key

    return str
}