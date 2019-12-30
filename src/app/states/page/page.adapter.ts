import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Page } from "./page.model";

/** The EntityAdapter for Page with select id */
export const pageAdapter: EntityAdapter<Page> = createEntityAdapter<Page>({
    selectId: (page) => page.id
  });