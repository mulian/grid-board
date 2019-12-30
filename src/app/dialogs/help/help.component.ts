import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../states/reducers';
import { selectDialogIsHelp } from '../../states/dialog'

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    // this.store.pipe(select(selectDialogIsHelp)).subscribe((isHelpShow:boolean) => {
    //   this.changeVisibility(isHelpShow)
    // })
  }
  // changeVisibility(isHelpShow: boolean) {
  //   console.log("Change Visibility: ", isHelpShow);
    
  //   if(isHelpShow && !this.isShow) this.openDialog()
  //   else if (!isHelpShow && this.isShow) this.closeDialog()
  //   this.isShow = isHelpShow
  // }
}
