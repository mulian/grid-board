import { TabState } from './tab.state'
import { TabSlideActionTypes } from './tab.actions.slide'
import { tabInitialState } from './tab.initial.state'
import { TabActions } from './tab.actions.main'

export function tabSlideReducer(
    state:TabState = tabInitialState,
    action: TabActions
  ): TabState {
    switch (action.type) {
        case TabSlideActionTypes.TriggerSlideBreak: {
            return {
                ...state,
                slide: {
                    ...state.slide,
                    isSlideBreak: action.payload.isBreak
                }
            }
        }
        case TabSlideActionTypes.TriggerSlides: {
            return {
                ...state,
                slide: {
                    ...state.slide,
                    isActive: action.payload.activate
                }
            }
        }
        case TabSlideActionTypes.TriggerBarSlides: {
            return {
                ...state,
                slide: {
                    ...state.slide,
                    isShowProgress: action.payload.activate
                }
            }
        }
        case TabSlideActionTypes.SetStartAfterInactiveTime: {
            return {
                ...state,
                slide: {
                    ...state.slide,
                    startAfterInactiveTimeInSec: action.payload.timeInSec
                }
            }
        }
        case TabSlideActionTypes.SetNextSlideTime: {
            return {
                ...state,
                slide: {
                    ...state.slide,
                    nextSlideInSec: action.payload.timeInSec
                }
            }
        }
        default: {
            return state
        }
    }
  }