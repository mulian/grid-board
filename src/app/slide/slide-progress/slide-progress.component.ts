import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { SlideService } from '../slide.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectTabSlide } from '../../states/reducers';
import { TabSlide } from '../../states/tab/tab.slide.model';
import { tabSlideInitialState } from '../../states/tab/tab.initial.state'

@Component({
  selector: 'app-slide-progress',
  templateUrl: './slide-progress.component.html',
  styleUrls: ['./slide-progress.component.scss']
})
export class SlideProgressComponent implements OnInit, AfterViewInit {
  @ViewChild("progressbar") progressbar: MatProgressBar;
  primaryValueBar: ElementRef;
  progressValue: number = 0
  sumTime: number;
  color:string = 'primary';
  isSlideModeVisible: boolean = true

  slideOptions: TabSlide = tabSlideInitialState

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.primaryValueBar = this.progressbar._primaryValueBar
    console.log(this.progressbar);
    
    this.store.pipe(select(selectTabSlide)).subscribe((slide: TabSlide) => {
      console.log("set slide",slide);
      
      // this.setSlideOptions(slide)
    })
  }

  

  setSlideOptions(newSlideOptions: TabSlide) {
    if (this.slideOptions == null) {
      if (newSlideOptions.isActive && !newSlideOptions.isSlideBreak) {
        this.setTime(newSlideOptions.nextSlideInSec)
      }
      if(newSlideOptions.isSlideBreak) {
        this.break()
      }
    } else {
      if (newSlideOptions.nextSlideInSec != this.slideOptions.nextSlideInSec 
        && newSlideOptions.isActive 
        && !newSlideOptions.isSlideBreak) {
        this.setTime(newSlideOptions.nextSlideInSec)
      }
      if(newSlideOptions.isSlideBreak && !this.slideOptions.isSlideBreak) {
        this.break()
      }
      if(this.slideOptions.isSlideBreak && !newSlideOptions.isSlideBreak) {
        this.setTime(newSlideOptions.nextSlideInSec)
      }
    }

    if(newSlideOptions.isActive && newSlideOptions.isShowProgress) {
      this.isSlideModeVisible = true
    } else {
      this.isSlideModeVisible = false
    }
    this.slideOptions = newSlideOptions
  }

  isSlideShow() {
    return this.slideOptions.isActive && this.slideOptions.isShowProgress
  }

  public break() {
    console.log("Proggress break");
    this.removeTransition()
    this.color = "warn"
    this.setTransformScaleX(0)

    clearTimeout(this.nextSlideInTimer)
  }

  nextSlideInTimer: any = null
  public setTime(time: number) {
    console.log("Proggress setTime", time);
    this.removeTransition()
    setTimeout(() => {
      this.color = "primary"
      this.setTransitionTime(time)
      this.setTransformScaleX(1)
    }, 200)

    this.nextSlideInTimer = setTimeout(() => {
      this.setTime(time)
    },time*1000)
  }

  private setTransitionTime(time: number) {
    this.sumTime = time
    if (time == 0) this.primaryValueBar.nativeElement.style.transition = "default"
    else this.primaryValueBar.nativeElement.style.transition = "transform " + time + "s linear"
  }
  private setTransformScaleX(toCurrentTime: number) {
    this.primaryValueBar.nativeElement.style.transform = "scaleX(" + toCurrentTime + ")"
  }
  private removeTransition(currentTime: number = 0) {
    if (currentTime > 0 && currentTime < this.sumTime) {
      currentTime = currentTime / this.sumTime
    }
    this.setTransitionTime(0)
    this.setTransformScaleX(currentTime)
  }
}
