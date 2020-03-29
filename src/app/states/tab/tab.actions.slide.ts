/**
 * Tab slide Action
 * Slide is a seperation of tab, cause it manipulates the Tab.
 */
import { props, createAction } from "@ngrx/store";

/**
 * En-/disalbe slide mode
 * @param activate if flase disable slide mode, if true enable slide mode
 */
export const triggerSlides = createAction(
  "[Tab.Slide] Trigger slide enable/disable",
  props<{ activate: boolean }>()
);

/**
 * Show Slide bar
 * @param activate if true, activate slide bar, if false deaktivate slide bar
 */
export const triggerBarSlides = createAction(
  "[Tab.Slide] Trigger slide bar enable/disable",
  props<{ activate: boolean }>()
);

/**
 * Set the select next tab time in sec.
 * @param timeInSec the next tab time in sec.
 */
export const setNextSlideTime = createAction(
  "[Tab.Slide] Set next slide time",
  props<{ timeInSec: number }>()
);

/**
 * Set the start after inactivity time in sec.
 * @param timeInSec the start after inactivity time in sec.
 */
export const setStartAfterInactiveTime = createAction(
  "[Tab.Slide] Set start after inactive time",
  props<{ timeInSec: number }>()
);

/**
 * Set Slide mode aktive/deaktiv
 * @param isBreak if true, break is set, if false slide mode is active
 */
export const triggerSlideBreak = createAction(
  "[Tab.Slide] Trigger slide break enable/disable",
  props<{ isBreak: boolean }>()
);
