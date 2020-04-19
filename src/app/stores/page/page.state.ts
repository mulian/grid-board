import { EntityState } from "@ngrx/entity";
import { PageModel } from "./page.model"

/** The PageState wich will be added to EntityState<Page> */
export interface PageState extends EntityState<PageModel> {
  options: {
    editPages: boolean
    editPageId: string
    activePage: string
  }
}