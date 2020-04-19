import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { KeyboardModel } from "./keyboard.model";

/** The EntityAdapter for Page with select id */
export const keyboardAdapter: EntityAdapter<KeyboardModel> = createEntityAdapter<KeyboardModel>({
    selectId: (keyboard) => keyboard.action
  });