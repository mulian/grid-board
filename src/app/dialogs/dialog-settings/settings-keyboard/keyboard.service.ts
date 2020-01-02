import { Injectable, AfterContentInit } from '@angular/core';
import { AppState } from '../../../states/reducers';
import { Store, select } from '@ngrx/store';
import { selectAllKeyboardEntities, KeyboardModel, TypeInput } from '../../../states/keyboard';
import { Dictionary } from '@ngrx/entity';
import { TranslateService } from '@ngx-translate/core';
import { IpcService } from '../settings-history/ipc.service';
import { KeyboardActions } from './keyboard.actions';
import { keypressEventToTypeInput } from './keyboard.translation'
import * as _ from 'lodash-es'


@Injectable({
  providedIn: 'root'
})
export class KeyboardService implements AfterContentInit {
  keyboardData: Dictionary<KeyboardModel>= {}
  keyboardAction: KeyboardActions;
  isPause: boolean = false

  constructor(private store: Store<AppState>,private translate: TranslateService,private ipcRenderer:IpcService) { 
    document.addEventListener("DOMContentLoaded", (event) => this.ngAfterContentInit()) //Own AfterContentInit hook
    this.store.pipe(select(selectAllKeyboardEntities)).subscribe((keyboardData: Dictionary<KeyboardModel>) => {
      console.log("keyboardData",keyboardData);
      this.keyboardData = keyboardData
    })
    this.keyboardAction = new KeyboardActions(store,translate,ipcRenderer)
  }

  pause() {
    this.isPause = true
  }
  resume() {
    this.isPause = false
  }

  ngAfterContentInit(): void {
    document.addEventListener("keydown", event => this.keyDownListener(event))
  }

  keyDownListener(event) {
    if(!this.isPause) {
      let typeInput:TypeInput = keypressEventToTypeInput(event)
      if(typeInput!=null) { //dont use meta/alt/ctrl/shift key
        console.log(typeInput);
        for(let keyboardKey in this.keyboardData) {
          let keyboard:KeyboardModel = this.keyboardData[keyboardKey]
  
          if(_.isEqual(keyboard.key,typeInput)) {
            console.log("match", keyboard.key,"fire",keyboard.action);
            this.keyboardAction.fire(keyboard.action)
          }
        }
      }
    }
    }
}
