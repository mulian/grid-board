import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { PageModel } from './page.model';
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

  SetActivePage = "[Page] Set Page Activ State",
}

export class SetActivePage implements Action {
  readonly type = PageActionTypes.SetActivePage;

  /**
   * Set Page active (only one page could be active at the same time)
   * @param payload.pageId the page id
   * @param payload.active set active (true) or deactive (false)
   */
  constructor(public payload: { pageId: string, active: boolean }) {}
}

export class LoadPages implements Action {
  readonly type = PageActionTypes.LoadPages;

  /**
   * Add more then one Page
   * @param payload.page the pages for add
   */
  constructor(public payload: { pages: PageModel[] }) {}
}

export class AddPage implements Action {
  readonly type = PageActionTypes.AddPage;

  /**
   * Add one Page
   * @param payload.page the page for add
   */
  constructor(public payload: { page: PageModel }) {
    this.payload.page.id = uuid.v4()
  }
}

export class UpsertPage implements Action {
  readonly type = PageActionTypes.UpsertPage;

  /**
   * Add or update a page
   * @param payload.page the added or updated page
   */
  constructor(public payload: { page: PageModel }) {}
}

export class AddPages implements Action {
  readonly type = PageActionTypes.AddPages;

  /**
   * Add Pages and set uuid
   * @param payload.pages the added pages
   */
  constructor(public payload: { pages: PageModel[] }) {
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
  constructor(public payload: { pages: PageModel[] }) {}
}

export class UpdatePage implements Action {
  readonly type = PageActionTypes.UpdatePage;

  /**
   * Update one Page
   * @param payload.page the update page
   */
  constructor(public payload: { page: Update<PageModel> }) {}
}

export class UpdatePages implements Action {
  readonly type = PageActionTypes.UpdatePages;

  /**
   * Update pages
   * @param payload.pages the updated pages
   */
  constructor(public payload: { pages: Update<PageModel>[] }) {}
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
 | ClearPages
 | SetActivePage;
