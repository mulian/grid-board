/**
 * Tab State definition
 */
import { EntityState } from "@ngrx/entity";
import { Tab } from "./tab.model";
import { TabSlide } from "./tab.slide.model";
import { TabOptions } from "./tab.options.model"

export interface TabState extends EntityState<Tab> {
    options: TabOptions,
    slide: TabSlide
  }