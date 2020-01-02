import { TypeInput } from "../../../states/keyboard";
import { keypressEventToTypeInput } from "./keyboard.translation";
import { KeyboardService } from "./keyboard.service";

export default class KeyboardRecognition {
    private _callback: ((typeInput: TypeInput) => void) = null
    private onEventFireVar: (event: KeyboardEvent) => void

    constructor(private keyboardService: KeyboardService) { }

    public rec(callback: ((typeInput: TypeInput) => void)) {
        this.keyboardService.pause()
        this._callback = callback
        this.onEventFireVar = (event: KeyboardEvent) => this.onEventFire(event)
        document.addEventListener("keydown", this.onEventFireVar)
    }
    private onEventFire(event: KeyboardEvent) {
        event.preventDefault()
        event.stopPropagation()
        
        let typeInput: TypeInput = keypressEventToTypeInput(event)
        if (typeInput != null) {
            this._callback(typeInput)
            this._callback = null
            this.keyboardService.resume()
            document.removeEventListener("keydown", this.onEventFireVar)
            this.onEventFireVar = null
        }
    }
}