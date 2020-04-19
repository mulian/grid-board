import { createAction, props } from "@ngrx/store"
import { actionStringCreator } from "../state.utils"

const actionStr = actionStringCreator("Slide")

export const startSlideShow = createAction(actionStr("Start slide show"))
export const stopSlideShow = createAction(actionStr("Stop slide show"))
export const nextSlide = createAction(actionStr("Trigger next Slide"))

/**
 * En-/disalbe slide mode
 * @param activate if flase disable slide mode, if true enable slide mode
 */
export const triggerSlides = createAction(actionStr("Trigger slide enable/disable"), props<{ activate: boolean }>())

/**
 * Show Slide bar
 * @param activate if true, activate slide bar, if false deaktivate slide bar
 */
export const triggerBarSlides = createAction(
    actionStr("Trigger slide bar enable/disable"),
    props<{ activate: boolean }>()
)

/**
 * Set the select next tab time in sec.
 * @param timeInSec the next tab time in sec.
 */
export const setNextSlideTime = createAction(actionStr("Set next slide time"), props<{ timeInSec: number }>())

/**
 * Set the start after inactivity time in sec.
 * @param timeInSec the start after inactivity time in sec.
 */
export const setStartAfterInactiveTime = createAction(
    actionStr("Set start after inactive time"),
    props<{ timeInSec: number }>()
)

/**
 * Set Slide mode aktive/deaktiv
 * @param isBreak if true, break is set, if false slide mode is active
 */
export const triggerSlideBreak = createAction(
    actionStr("Trigger slide break enable/disable"),
    props<{ isBreak: boolean }>()
)
