import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron'

@Injectable({
  providedIn: 'root'
})
export class IpcService {

  constructor() {
    
   }
   send(channel:string,arg:any) {
    ipcRenderer.send(channel,arg)
  }
   sendSync(channel:string,arg:any):any {
     let data = ipcRenderer.sendSync(channel,arg)
     console.log("data",data);
     return data
   }
}
