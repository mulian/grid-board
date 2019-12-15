import { EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Page } from "./page.model";

export const pageAdapter: EntityAdapter<Page> = createEntityAdapter<Page>({
    selectId: (page) => page.id
  });