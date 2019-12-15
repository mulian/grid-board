import { Injectable, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppState, selectTabSlide, selectTabOptions } from '../states/reducers';
import { Store, select } from '@ngrx/store';
import { TabSlide } from '../states/tab/tab.slide.model';
import { TriggerSlideBreak } from '../states/tab/tab.actions.slide';
import { NavigationSelectTabType, NavigateSelectTab } from '../states/tab';

@Injectable({
  providedIn: 'root'
})
export class SlideService implements AfterContentInit {
  breakTime: number = 10 * 1000
  timeout: NodeJS.Timeout = null
  public slideOptions: TabSlide = null

  constructor(private store: Store<AppState>) {
    document.addEventListener("DOMContentLoaded", (event) => this.ngAfterContentInit()) //Own AfterContentInit hook
    this.store.pipe(select(selectTabSlide)).subscribe((slide: TabSlide) => {
      this.setNewSlideOptions(slide)
    })
  }

  private setNewSlideOptions(slideOptions: TabSlide) {
    let activateNextSlideTimer: boolean = false
    console.log("new slide option:", slideOptions);
    if (slideOptions.isActive && (this.slideOptions == null || !this.slideOptions.isActive)) {
      console.log("activate..");

      activateNextSlideTimer = true
    }
    if (this.slideOptions != null) {
      if (slideOptions.isSlideBreak && !this.slideOptions.isSlideBreak) { //break was set
        this.deactivateNextSlideTimer()
        this.setBreakTimeout()
      }
      else if (!slideOptions.isSlideBreak && this.slideOptions.isSlideBreak) { //break is resumed
        activateNextSlideTimer = true
      }
      if (slideOptions.nextSlideInSec != this.slideOptions.nextSlideInSec) {
        this.deactivateNextSlideTimer()
        activateNextSlideTimer = true
      }
    }

    this.slideOptions = slideOptions
    if (activateNextSlideTimer) this.activateNextSlideTimer()
  }

  nextSlideTimer: any = null
  public activateNextSlideTimer() {
    if (this.nextSlideTimer != null) {
      console.error("There is already a next Slide Timer");
    } else {
      console.log("Activate next slide Timer");
      this.nextSlideTimer = setTimeout(() => {
        this.store.dispatch(new NavigateSelectTab({ navigationType: NavigationSelectTabType.TabRotationRight }))
        this.nextSlideTimer = null
        this.activateNextSlideTimer()
      }, this.slideOptions.nextSlideInSec * 1000)
    }
  }
  public deactivateNextSlideTimer() {
    if (this.nextSlideTimer != null) {
      console.log("Deactivate next slide Timer");
      clearTimeout(this.nextSlideTimer)
      this.nextSlideTimer = null
    } else {
      console.error("There is no next Slide Timer to deactivate");
    }
  }

  private setBreakTimeout() {
    this.breakTimer = setTimeout(() => {
      this.store.dispatch(new TriggerSlideBreak({ isBreak: false }))
    }, this.slideOptions.startAfterInactiveTimeInSec * 1000)
  }
  breakTimer = null
  private itterateBreakTimer() {
    if (this.slideOptions.isSlideBreak) {
      console.log("itterate break timer");
      if (this.breakTimer != null) {
        clearTimeout(this.breakTimer)
      }
      this.setBreakTimeout()
    }
  }

  public setBreak() {
    if (this.slideOptions.isActive) {
      if (!this.slideOptions.isSlideBreak) { //break is not known
        console.log("Slide Break");
        this.store.dispatch(new TriggerSlideBreak({ isBreak: true }))
      } else {
        this.itterateBreakTimer()
      }
    }
  }

  ngAfterContentInit(): void {
    document.addEventListener('mousemove', e => this.setBreak())
    document.addEventListener("keydown", e => this.setBreak())
  }
}
