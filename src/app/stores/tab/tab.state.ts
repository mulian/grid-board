/**
 * Tab State definition
 */
import { EntityState } from "@ngrx/entity"
import { TabModel } from "./tab.model"
import { TabOptions } from "./tab.options.model"

export interface TabState extends EntityState<TabModel> {
    options: TabOptions
}
