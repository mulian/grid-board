import { Component, OnInit } from "@angular/core"
import { AppState, selectTabSlide } from "../../../stores/reducers"
import { Store, select } from "@ngrx/store"
import { TabSlide } from "../../../stores/tab/tab.slide.model"
import { TranslateService } from "@ngx-translate/core"
import {
    setStartAfterInactiveTime,
    setNextSlideTime,
    triggerSlides,
    triggerBarSlides,
} from "../../../stores/tab/tab.actions.slide"

@Component({
    selector: "app-settings-slide",
    templateUrl: "./settings-slide.component.html",
    styleUrls: ["./settings-slide.component.scss"],
})
export class SettingsSlideComponent implements OnInit {
    slideOptions: TabSlide
    constructor(private store: Store<AppState>, public translate: TranslateService) {}

    setAfterInactivity(time: number, event) {
        if (time != this.slideOptions.startAfterInactiveTimeInSec)
            this.store.dispatch(setStartAfterInactiveTime({ timeInSec: time }))
    }

    setNextSlideTime(time: number, event) {
        if (time != this.slideOptions.nextSlideInSec) this.store.dispatch(setNextSlideTime({ timeInSec: time }))
    }

    setSlide(event) {
        if (event.checked != this.slideOptions.isActive) this.store.dispatch(triggerSlides({ activate: event.checked }))
    }

    setSlideProgress(event) {
        if (event.checked != this.slideOptions.isShowProgress)
            this.store.dispatch(triggerBarSlides({ activate: event.checked }))
    }

    ngOnInit() {
        this.store.pipe(select(selectTabSlide)).subscribe((slideOption: TabSlide) => {
            this.slideOptions = slideOption
        })
    }
}
