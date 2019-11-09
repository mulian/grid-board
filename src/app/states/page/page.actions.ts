import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Page } from './page.model';
import * as uuid from 'uuid';

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
  ClearPages = '[Page] Clear Pages'
}

export class LoadPages implements Action {
  readonly type = PageActionTypes.LoadPages;

  constructor(public payload: { pages: Page[] }) {}
}

export class AddPage implements Action {
  readonly type = PageActionTypes.AddPage;

  constructor(public payload: { page: Page }) {
    this.payload.page.id = uuid.v4()
  }
}

export class UpsertPage implements Action {
  readonly type = PageActionTypes.UpsertPage;

  constructor(public payload: { page: Page }) {}
}

export class AddPages implements Action {
  readonly type = PageActionTypes.AddPages;

  constructor(public payload: { pages: Page[] }) {
    for(let tab of this.payload.pages) {
      tab.id = uuid.v4()
    }
  }
}

export class UpsertPages implements Action {
  readonly type = PageActionTypes.UpsertPages;

  constructor(public payload: { pages: Page[] }) {}
}

export class UpdatePage implements Action {
  readonly type = PageActionTypes.UpdatePage;

  constructor(public payload: { page: Update<Page> }) {}
}

export class UpdatePages implements Action {
  readonly type = PageActionTypes.UpdatePages;

  constructor(public payload: { pages: Update<Page>[] }) {}
}

export class DeletePage implements Action {
  readonly type = PageActionTypes.DeletePage;

  constructor(public payload: { id: string }) {}
}

export class DeletePages implements Action {
  readonly type = PageActionTypes.DeletePages;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearPages implements Action {
  readonly type = PageActionTypes.ClearPages;
}

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
