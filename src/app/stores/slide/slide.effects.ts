import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { map, mergeMap, withLatestFrom, debounce, filter } from "rxjs/operators"
import { of, fromEvent, merge, interval, BehaviorSubject } from "rxjs"

import * as SlideActions from "./slide.actions"
import { Store } from "@ngrx/store"
import { SlideState } from "./slide.reducer"
import { selectSlideInactiveTime, selectSlideIsActive, selectTabSlide } from "../reducers"
import { navigateSelectTab, NavigationSelectTabType } from "../tab/tab.actions"

@Injectable()
export class SlideEffects {
    onUserActivity$ = merge(fromEvent(document, "mousemove"), fromEvent(document, "keydown")) //Watch on mousemove or keydown
    stopSlideShowOnUserActivity$ = createEffect(() =>
        this.onUserActivity$.pipe(
            withLatestFrom(this.store$.select(selectTabSlide)),
            map(([event, slideState]) => slideState),
            filter(slideState => slideState.isEnabled && slideState.isActive),
            mergeMap(isSlideActive => of(SlideActions.stopSlideShow()))
        )
    )
    afterUserActivityAndInactiveTimeDebounce$ = createEffect(() => {
        return this.onUserActivity$.pipe(
            withLatestFrom(this.store$.select(selectTabSlide)), //Add slideInactiveTimer from store
            map(([event, slideState]) => slideState), //Remove event parameter, only slideInactiveTime
            filter(slideState => slideState.isEnabled && !slideState.isActive),
            debounce(slideState => interval(slideState.startAfterInactiveTimeInSec * 1000)), //debounce on slideInactiveTime * 100 to get secounds
            withLatestFrom(this.store$.select(selectTabSlide)), //Add slideInactiveTimer from store
            map(([slideStateOld, slideState]) => slideState), //Remove event parameter, only slideInactiveTime
            filter(slideState => slideState.isEnabled && !slideState.isActive),
            mergeMap(slideState => of(SlideActions.startSlideShow()))
        )
    })

    slideProgress$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SlideActions.startSlideShow, SlideActions.nextSlide, SlideActions.triggerSlides),
            withLatestFrom(this.store$.select(selectTabSlide)), //Add slideInactiveTimer from store
            map(([event, slideState]) => slideState), //Remove event parameter, only slideInactiveTime
            filter(slideState => slideState.isEnabled && slideState.isActive), //dont start if not enabled
            debounce(slideState => interval(slideState.nextSlideInSec * 1000)),
            withLatestFrom(this.store$.select(selectSlideIsActive)), //Add isActive (after debounce)
            map(([slideState, isActive]) => isActive), //Remove slideState parameter
            filter(isActive => isActive),
            mergeMap(slideState =>
                of(
                    SlideActions.nextSlide(),
                    navigateSelectTab({
                        navigationType: NavigationSelectTabType.TabRotationRight,
                        exceptSlideNotConsidered: false,
                    })
                )
            )
        )
    })

    onInitSendStartSlideShow$ = createEffect(() => {
        let initStream: BehaviorSubject<string> = new BehaviorSubject("init")
        return initStream.pipe(
            withLatestFrom(this.store$.select(selectTabSlide)), //Add slideInactiveTimer from store
            map(([event, slideState]) => slideState), //Remove event parameter, only slideInactiveTime
            filter(slideState => slideState.isEnabled),
            mergeMap(slideState => {
                setTimeout(() => initStream.complete(), 0)
                return of(SlideActions.startSlideShow())
            })
        )
    })

    constructor(private actions$: Actions, private store$: Store<SlideState>) {}
}
