import { Component, OnInit } from '@angular/core';
import { ReducerStore,reducerStoreInstance,SaveState } from '../../../states/reducer.store';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Store } from '@ngrx/store';
import { AppState } from '../../../states/reducers';
import { SetState } from '../../../states/reducer.store.actions';
import { ChangeHistoryLimit, selectGeneralHistoryLimit } from '../../../states/general';
import { IpcService } from './ipc.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-settings-history',
  templateUrl: './settings-history.component.html',
  styleUrls: ['./settings-history.component.scss']
})
export class SettingsHistoryComponent implements OnInit {
  reducerStore:ReducerStore

  itemMap: {[key:string]:SaveState} = {}
  historyLimitNumber: number=0;
  constructor(private store: Store<AppState>, private ipcRenderer:IpcService, public translate: TranslateService) { }
  
  ngOnInit() {
    this.reducerStore = reducerStoreInstance
    this.store.select(selectGeneralHistoryLimit).subscribe((limit:number) => {
      
      
      this.historyLimitNumber = limit
      console.log("limit:",this.historyLimitNumber);
    })
  }

  saveCurrentStateToJson() {
    this.ipcRenderer.send("save-json",this.reducerStore.getCurrentState())
  }

  loadStateFromJson() {
    let jsonData:string = this.ipcRenderer.sendSync("load-json",null)
    if(jsonData==null) {
      console.info("Get null from choose file")
    } else {
      let state:AppState = JSON.parse(jsonData) as AppState
      this.loadState(state)
    }
  }

  sethistoryLimit(newLimit:number,event) {
    this.store.dispatch(new ChangeHistoryLimit({historyLimit:newLimit}))
  }

  loadState(state:AppState) {
    this.store.dispatch(new SetState({state:state}))
  }

  getStringify(object:any) {
    return JSON.stringify(object,null,2)
  }

  getItem(id:string) {
    if(!(id in this.itemMap)) {
      this.itemMap[id] = this.reducerStore.getItem(id)
    }
    return this.itemMap[id]
  }

}
