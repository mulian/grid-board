import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { PageModel } from "./page.model";

/** The EntityAdapter for Page with select id */
export const pageAdapter: EntityAdapter<PageModel> = createEntityAdapter<PageModel>({
    selectId: (page) => page.id
  });