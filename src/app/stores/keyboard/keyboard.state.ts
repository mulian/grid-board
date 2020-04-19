import { EntityState } from "@ngrx/entity";
import { KeyboardModel } from "./keyboard.model"

/** The PageState wich will be added to EntityState<Page> */
export interface KeyboardState extends EntityState<KeyboardModel> {

}