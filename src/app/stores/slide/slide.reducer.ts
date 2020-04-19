import { Action, createReducer, on } from "@ngrx/store"
import * as SlideActions from "./slide.actions"
import {
    triggerSlideBreak,
    setStartAfterInactiveTime,
    setNextSlideTime,
    triggerSlides,
    triggerBarSlides,
} from "./slide.actions"

export const slideFeatureKey = "slide"

export interface SlideState {
    isEnabled: boolean
    isActive: boolean
    isShowProgress: boolean
    isSlideBreak: boolean
    nextSlideInSec: number
    startAfterInactiveTimeInSec: number
}

export const slideInitialState: SlideState = {
    isEnabled: true,
    isActive: true,
    isShowProgress: true,
    nextSlideInSec: 300,
    startAfterInactiveTimeInSec: 30,
    isSlideBreak: false,
}

export const slideReducer = createReducer(
    slideInitialState,
    on(SlideActions.startSlideShow, state => {
        return {
            ...state,
            isActive: true,
        }
    }),
    on(SlideActions.stopSlideShow, state => {
        return {
            ...state,
            isActive: false,
        }
    }),
    on(triggerSlideBreak, (state, { isBreak }) => ({
        ...state,
        isSlideBreak: isBreak,
    })),
    on(setStartAfterInactiveTime, (state, { timeInSec }) => ({
        ...state,
        startAfterInactiveTimeInSec: timeInSec,
    })),
    on(setNextSlideTime, (state, { timeInSec }) => ({
        ...state,
        nextSlideInSec: timeInSec,
    })),
    on(triggerSlides, (state, { activate }) => ({
        ...state,
        isEnabled: activate,
    })),
    on(triggerBarSlides, (state, { activate }) => ({
        ...state,
        isShowProgress: activate,
    }))
)
