import { EntityState } from "@ngrx/entity";
import { JSInjectionModel } from "./jsInjection.model"

/** The PageState wich will be added to EntityState<Page> */
export interface JSInjectionState extends EntityState<JSInjectionModel> {

}