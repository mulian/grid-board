import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Page } from './page.model';
import * as uuid from 'uuid';

/** The PageActionTypes */
export enum PageActionTypes {
  LoadPages = '[Page] Load Pages',
  AddPage = '[Page] Add Page',
  UpsertPage = '[Page] Upsert Page',
  AddPages = '[Page] Add Pages',
  UpsertPages = '[Page] Upsert Pages',
  UpdatePage = '[Page] Update Page',
  UpdatePages = '[Page] Update Pages',
  DeletePage = '[Page] Delete Page',
  DeletePages = '[Page] Delete Pages',
  ClearPages = '[Page] Clear Pages',
}

export class LoadPages implements Action {
  readonly type = PageActionTypes.LoadPages;

  /**
   * Add more then one Page
   * @param payload.page the pages for add
   */
  constructor(public payload: { pages: Page[] }) {}
}

export class AddPage implements Action {
  readonly type = PageActionTypes.AddPage;

  /**
   * Add one Page
   * @param payload.page the page for add
   */
  constructor(public payload: { page: Page }) {
    this.payload.page.id = uuid.v4()
  }
}

export class UpsertPage implements Action {
  readonly type = PageActionTypes.UpsertPage;

  /**
   * Add or update a page
   * @param payload.page the added or updated page
   */
  constructor(public payload: { page: Page }) {}
}

export class AddPages implements Action {
  readonly type = PageActionTypes.AddPages;

  /**
   * Add Pages and set uuid
   * @param payload.pages the added pages
   */
  constructor(public payload: { pages: Page[] }) {
    for(let tab of this.payload.pages) {
      tab.id = uuid.v4()
    }
  }
}

export class UpsertPages implements Action {
  readonly type = PageActionTypes.UpsertPages;

  /**
   * Add or update Pages
   * @param payload.pages the add or update pages
   */
  constructor(public payload: { pages: Page[] }) {}
}

export class UpdatePage implements Action {
  readonly type = PageActionTypes.UpdatePage;

  /**
   * Update one Page
   * @param payload.page the update page
   */
  constructor(public payload: { page: Update<Page> }) {}
}

export class UpdatePages implements Action {
  readonly type = PageActionTypes.UpdatePages;

  /**
   * Update pages
   * @param payload.pages the updated pages
   */
  constructor(public payload: { pages: Update<Page>[] }) {}
}

export class DeletePage implements Action {
  readonly type = PageActionTypes.DeletePage;

  /**
   * Delete page
   * @param payload.id delete the page with id
   */
  constructor(public payload: { id: string }) {}
}

export class DeletePages implements Action {
  readonly type = PageActionTypes.DeletePages;

  /**
   * Delete pages
   * @param payload.ids delete the pages with ids
   */
  constructor(public payload: { ids: string[] }) {}
}

/**
 * Clear all Pages
 */
export class ClearPages implements Action {
  readonly type = PageActionTypes.ClearPages;
}

/** The PageActions for reducer */
export type PageActions =
 LoadPages
 | AddPage
 | UpsertPage
 | AddPages
 | UpsertPages
 | UpdatePage
 | UpdatePages
 | DeletePage
 | DeletePages
 | ClearPages;
