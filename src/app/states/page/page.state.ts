import { EntityState } from "@ngrx/entity";
import { Page } from "./page.model"

/** The PageState wich will be added to EntityState<Page> */
export interface PageState extends EntityState<Page> {
  options: {
    editPages: boolean
    editPageId: string
  }
}