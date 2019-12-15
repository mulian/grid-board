import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { SlideService } from '../slide.service';
import { Store, select } from '@ngrx/store';
import { AppState, selectTabSlide } from '../../states/reducers';
import { TabSlide } from '../../states/tab/tab.slide.model';

@Component({
  selector: 'app-slide-progress',
  templateUrl: './slide-progress.component.html',
  styleUrls: ['./slide-progress.component.scss']
})
export class SlideProgressComponent implements OnInit, AfterViewInit {
  @ViewChild("progressbar", { read: false, static: false }) progressbar: MatProgressBar;
  primaryValueBar: ElementRef;
  progressValue: number = 0
  sumTime: number;
  color = 'primary';

  slideOptions: TabSlide = null

  constructor(private slideService: SlideService, private store: Store<AppState>) { }

  ngOnInit() {
    // setInterval(() => {
    //   this.progressValue = 0;
    //   this.progressValue = 100;
    // }, 100000)
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

    this.slideOptions = newSlideOptions
  }

  ngAfterViewInit(): void {
    this.primaryValueBar = this.progressbar._primaryValueBar

    console.log(this.primaryValueBar.nativeElement)


    this.store.pipe(select(selectTabSlide)).subscribe((slide: TabSlide) => {
      this.setSlideOptions(slide)
    })
    // setTimeout(() => {
    //   this.setTime(60);
    // }, 6000)

    // setTimeout(() => {
    //   this.break();
    // }, 12000)

    // setTimeout(() => {
    //   this.setTime(100);
    // }, 20000)

    // setTimeout(() => {
    //   this.break();
    // }, 25000)

    // this.removeTransition()
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
    }, 100)

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
