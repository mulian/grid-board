import { Component, OnInit } from '@angular/core';
import { SlideService } from '../slide/slide.service';
import { DialogService } from '../dialogs/dialog.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../states/reducers';
import { selectGeneralLang } from '../states/general';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  /**
   * Constructor for main components.
   * @param slideService only to get a instance of service
   * @param dialogService only to get a instance of service
   */
  constructor(private slideService:SlideService, private dialogService:DialogService, private store: Store<AppState>,public translate: TranslateService) {
    this.store.pipe(select(selectGeneralLang)).subscribe((lang:string) => {
      this.translate.setDefaultLang(lang)
    })
  }

  ngOnInit() {
  }

}
