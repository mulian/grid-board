import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { JSInjectionModel } from "./jsInjection.model";

/** The EntityAdapter for Page with select id */
export const jSInjectionAdapter: EntityAdapter<JSInjectionModel> = createEntityAdapter<JSInjectionModel>({
    selectId: (jSInjection) => jSInjection.id
  });