import { Component, OnInit } from '@angular/core';
import { AppState, selectTabSlide } from '../../../states/reducers';
import { Store, select } from '@ngrx/store';
import { TabSlide } from '../../../states/tab/tab.slide.model';
import { TranslateService } from '@ngx-translate/core';
import { TriggerBarSlides, TriggerSlides, SetNextSlideTime, SetStartAfterInactiveTime } from '../../../states/tab/tab.actions.slide';

@Component({
  selector: 'app-settings-slide',
  templateUrl: './settings-slide.component.html',
  styleUrls: ['./settings-slide.component.scss']
})
export class SettingsSlideComponent implements OnInit {
  slideOptions:TabSlide
  constructor(private store: Store<AppState>,public translate: TranslateService) { }

  setAfterInactivity(time:number) {
    if(time!=this.slideOptions.startAfterInactiveTimeInSec) this.store.dispatch(new SetStartAfterInactiveTime({timeInSec:time}))
  }

  setNextSlideTime(time:number) {
    if(time!=this.slideOptions.nextSlideInSec) this.store.dispatch(new SetNextSlideTime({timeInSec:time}))
  }

  setSlide(event) {
    if(event.checked != this.slideOptions.isActive) this.store.dispatch(new TriggerSlides({activate:event.checked}))
  }

  setSlideProgress(event) {
    if(event.checked != this.slideOptions.isShowProgress) this.store.dispatch(new TriggerBarSlides({activate:event.checked}))
  }

  ngOnInit() {
    this.store.pipe(select(selectTabSlide)).subscribe((slideOption:TabSlide) => {
      this.slideOptions = slideOption
    })
  }

}
