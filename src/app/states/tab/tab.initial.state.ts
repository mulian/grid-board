/**
 * Tab initial state.
 */
import {TabState} from './tab.state'
import { adapter } from './tab.adapter'

export const tabInitialState: TabState = adapter.getInitialState({
    options: {
      selectedTab: "no_selection",
      editTab: null
    },
    slide: {
      isActive: false,
      isShowProgress: true,
      nextSlideInSec: 300,
      startAfterInactiveTimeInSec: 180,
      isSlideBreak: false
    }
  })