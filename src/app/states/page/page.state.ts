import { EntityState } from "@ngrx/entity";
import { Page } from "./page.model"

export interface PageState extends EntityState<Page> {
    options: {
      editPages: boolean
      editPageId: string
    }
  }