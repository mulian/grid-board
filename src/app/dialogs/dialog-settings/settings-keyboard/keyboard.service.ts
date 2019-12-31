import { Injectable, AfterContentInit } from '@angular/core';
import { AppState } from '../../../states/reducers';
import { Store, select } from '@ngrx/store';
import { selectAllKeyboardEntities, KeyboardModel, TypeInput } from '../../../states/keyboard';
import { Dictionary } from '@ngrx/entity';
import { TranslateService } from '@ngx-translate/core';
import { IpcService } from '../settings-history/ipc.service';
import { KeyboardActions } from './keyboard.actions';



@Injectable({
  providedIn: 'root'
})
export class KeyboardService implements AfterContentInit {
  keyboardData: Dictionary<KeyboardModel>= {}
  keyboardAction: KeyboardActions;
  

  constructor(private store: Store<AppState>,private translate: TranslateService,private ipcRenderer:IpcService) { 
    document.addEventListener("DOMContentLoaded", (event) => this.ngAfterContentInit()) //Own AfterContentInit hook
    this.store.pipe(select(selectAllKeyboardEntities)).subscribe((keyboardData: Dictionary<KeyboardModel>) => {
      console.log("keyboardData",keyboardData);
      this.keyboardData = keyboardData
    })
    this.keyboardAction = new KeyboardActions(store,translate,ipcRenderer)
  }

  ngAfterContentInit(): void {
    document.addEventListener("keydown", event => this.keyDownListener(event))
  }

  /**
   * Retern key in well structured format
   * 
   * @param event the dom event
   * @param isAllKeyPress if true return on every press except meta keys if false return null on meta keys
   */
  toTypeInput(event,isAllKeyPress:boolean=false):TypeInput {
    if(event.key.length==1 || isAllKeyPress) {
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

  keyDownListener(event) {
    let typeInput:TypeInput = this.toTypeInput(event)
    if(typeInput!=null) { //dont use meta/alt/ctrl/shift key
      console.log(typeInput);
      for(let keyboardKey in this.keyboardData) {
        let keyboard:KeyboardModel = this.keyboardData[keyboardKey]

        if(keyboard.key==typeInput) {
          console.log("match", keyboard.key,"fire",keyboard.action);
          this.keyboardAction.fire(keyboard.action)
        }
      }
    }
  }
}
