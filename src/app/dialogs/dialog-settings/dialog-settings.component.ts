import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../states/reducers';
import { selectDialogAll, DialogModelSettings, selectDialogSettings, SelectSettingsTab } from '../../states/dialog';
import { dialogInitialStateSettings } from '../../states/dialog/dialog.initial.state'
import { SettingsTab } from '../../states/dialog/dialog.model'
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit, OnDestroy {

  dialogSettings: DialogModelSettings = dialogInitialStateSettings
  selected = new FormControl(0);
  settingsSubscription:Subscription = null
  constructor(private store: Store<AppState>, public translate: TranslateService) { }


  ngOnInit() {
    this.settingsSubscription = this.store.pipe(select(selectDialogSettings)).subscribe((dialogSettings:DialogModelSettings) => {
      if(dialogSettings.currentTab != this.selected.value) { //only if tab is not already selected
        this.selected.setValue(dialogSettings.currentTab)
      }

      this.dialogSettings = dialogSettings
    })

    // this.selected.
    this.selected.valueChanges.subscribe((value:number) => {
      if(this.dialogSettings.currentTab!=value) { //only if tab is not already selected
        this.store.dispatch(new SelectSettingsTab({tab: SettingsTab[SettingsTab[value]]}))
      }
    })
  }
  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe()
  }
}