import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { KeyboardService } from './keyboard.service';
import { KeyboardModel, selectAllKeyboardEntities } from '../../../states/keyboard';
import { KeyboardAction, TypeInput } from '../../../states/keyboard/keyboard.model'
import { AppState } from '../../../states/reducers';
import { Store, select } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import * as _ from 'lodash-es'
import { keyboardTranslation } from './keyboard.translation';
import { elementAt } from 'rxjs/operators';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

let tmp:KeyboardModel = {
  action: KeyboardAction.NEXT_TAB_RIGHT,
  active: false,
  key: {
    isAlt: false,
    isCtrl: false,
    isMeta: false,
    isShift: false,
    key: 'a'
  }
}

@Component({
  selector: 'app-settings-keyboard',
  templateUrl: './settings-keyboard.component.html',
  styleUrls: ['./settings-keyboard.component.scss']
})
export class SettingsKeyboardComponent implements OnInit {
  dataSource:KeyboardModel[] = [tmp]
  displayedColumns: string[] = ['key', 'action', 'active'];

  keyEditOnAction:number = null

  constructor(public translate: TranslateService, public keyboard:KeyboardService,private store: Store<AppState>) {
    this.dataSource = this.initAllPossibleKeyboardActions()
   }
   initAllPossibleKeyboardActions():KeyboardModel[] {
     console.log(KeyboardAction);
     
     let keyboardModels: KeyboardModel[] = []
    for(let actionKey in KeyboardAction) {
      if((typeof actionKey) == 'string') {
        console.log(actionKey);
        
        let actionValue: string = KeyboardAction[actionKey]
        keyboardModels.push({
          action: KeyboardAction[actionValue],
          active: false,
          key: null
        })
      }
    }
    console.log(keyboardModels);
    
    return keyboardModels
   }

   actionToString(actionNumber: number) {
     return KeyboardAction[actionNumber]
   }

   stringify(obj:any) {
     return JSON.stringify(obj)
   }
  keyboardTranslation(typeInput:TypeInput) {
    return keyboardTranslation(typeInput)
  }

  

  ngOnInit() {
    this.store.pipe(select(selectAllKeyboardEntities)).subscribe((keyboardData: Dictionary<KeyboardModel>) => {
      console.log("keyboardData",keyboardData);
      // this.dataSource = _.values(keyboardData)
      // this.dataSource.push(tmp)
      this.updateDataSourcWithStoreData(keyboardData)
    })
  }

  updateDataSourcWithStoreData(keyboardData:Dictionary<KeyboardModel>) {
    for(let keyboardModelKey in keyboardData) {
      let keyboardModel:KeyboardModel = keyboardData[keyboardModelKey]

      for(let dataItem of this.dataSource) {
        if(dataItem.action==keyboardModel.action) {
          dataItem.active = keyboardModel.active
          dataItem.key = keyboardModel.key
        }
      }
    }
  }

  addNewKey() {
    console.log("add new key");
    //TODO: create new stepped dialog for add key + action
    
  }

}
