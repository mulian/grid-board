import { Injectable, AfterViewInit, AfterContentInit } from "@angular/core"
import { Store, select } from "@ngrx/store"
import { NavigationSelectTabType, navigateSelectTab } from "../stores/tab"
import { SlideState } from "../stores/slide/slide.reducer"
import { AppState, selectTabSlide } from "../stores/reducers"
import { triggerSlideBreak } from "../stores/slide/slide.actions"

@Injectable({
    providedIn: "root",
})
export class SlideService implements AfterContentInit {
    breakTime: number = 10 * 1000
    timeout: NodeJS.Timeout = null
    public slideOptions: SlideState = null

    constructor(private store: Store<AppState>) {
        // document.addEventListener("DOMContentLoaded", event => this.ngAfterContentInit()) //Own AfterContentInit hook
        // this.store.pipe(select(selectTabSlide)).subscribe((slide: SlideState) => {
        //     console.log("new slide options", slide)
        //     this.setNewSlideOptions(slide)
        // })
    }

    private setNewSlideOptions(slideOptions: SlideState) {
        let activateNextSlideTimer: boolean = false
        if (slideOptions.isActive && (this.slideOptions == null || !this.slideOptions.isActive)) {
            activateNextSlideTimer = true
        }
        if (this.slideOptions != null) {
            if (slideOptions.isSlideBreak && !this.slideOptions.isSlideBreak) {
                //break was set
                this.deactivateNextSlideTimer()
                this.setBreakTimeout()
            } else if (!slideOptions.isSlideBreak && this.slideOptions.isSlideBreak) {
                //break is resumed
                activateNextSlideTimer = true
            }
            if (slideOptions.nextSlideInSec != this.slideOptions.nextSlideInSec) {
                this.deactivateNextSlideTimer()
                activateNextSlideTimer = true
            }
            if (!slideOptions.isActive) activateNextSlideTimer = false
        }

        this.slideOptions = slideOptions
        if (activateNextSlideTimer) this.activateNextSlideTimer()
    }

    nextSlideTimer: any = null
    public activateNextSlideTimer() {
        if (this.nextSlideTimer != null) {
            console.error("There is already a next Slide Timer")
        } else {
            this.nextSlideTimer = setTimeout(() => {
                this.store.dispatch(
                    navigateSelectTab({
                        navigationType: NavigationSelectTabType.TabRotationRight,
                        exceptSlideNotConsidered: true,
                    })
                )
                this.nextSlideTimer = null
                this.activateNextSlideTimer()
            }, this.slideOptions.nextSlideInSec * 1000)
        }
    }
    public deactivateNextSlideTimer() {
        if (this.nextSlideTimer != null) {
            clearTimeout(this.nextSlideTimer)
            this.nextSlideTimer = null
        } else {
            console.error("There is no next Slide Timer to deactivate")
        }
    }

    private setBreakTimeout() {
        this.breakTimer = setTimeout(() => {
            this.store.dispatch(triggerSlideBreak({ isBreak: false }))
        }, this.slideOptions.startAfterInactiveTimeInSec * 1000)
    }
    breakTimer = null
    private itterateBreakTimer() {
        if (this.slideOptions.isSlideBreak) {
            if (this.breakTimer != null) {
                clearTimeout(this.breakTimer)
            }
            this.setBreakTimeout()
        }
    }

    public setBreak() {
        if (this.slideOptions.isActive) {
            if (!this.slideOptions.isSlideBreak) {
                //break is not known
                console.log("once", this.slideOptions)

                this.store.dispatch(triggerSlideBreak({ isBreak: true }))
            } else {
                this.itterateBreakTimer()
            }
        }
    }

    ngAfterContentInit(): void {
        document.addEventListener("mousemove", e => this.setBreak())
        document.addEventListener("keydown", e => this.setBreak())
    }
}
