import { createFeatureSelector, createSelector } from "@ngrx/store"
import * as fromSlide from "./slide.reducer"

export const selectSlideState = createFeatureSelector<fromSlide.SlideState>(fromSlide.slideFeatureKey)
