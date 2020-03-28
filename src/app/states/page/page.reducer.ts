import { PageActions, PageActionTypes } from './page.actions';
import { PageState } from './page.state'
import { pageAdapter } from './page.adapter';
import { pageInitialState } from './page.initial.state';
import { PageModel, WebviewData } from './page.model';
import { Update } from '@ngrx/entity';

function resetScrollWhenNavigate(page:Update<PageModel>):Update<PageModel> {
  if(page.changes.url!=null) {

    
    let webviewChanges: Partial<WebviewData> = {
        scrollX: 0,
        scrollY: 0,
    }
    page.changes.webviewData = webviewChanges as WebviewData
  }
  return page
}

/** The Page reducer */
export function pageReducer(
  state = pageInitialState,
  action: PageActions
): PageState {
  return state;
  switch (action.type) {
    case PageActionTypes.AddPage: { //Add Page
      return pageAdapter.addOne(action.payload.page, state);
    }
    case PageActionTypes.UpsertPage: { 
      return pageAdapter.upsertOne(action.payload.page, state);
    }
    case PageActionTypes.AddPages: {
      return pageAdapter.addMany(action.payload.pages, state);
    }
    case PageActionTypes.UpsertPages: {
      return pageAdapter.upsertMany(action.payload.pages, state);
    }
    case PageActionTypes.UpdatePage: {
      //TODO: Check, get current page check if x,y or tab ref. was changed and check
      let page:Update<PageModel> = action.payload.page
      return pageAdapter.updateOne(page, state);
    }
    case PageActionTypes.UpdatePageWebviewData: {
      let pageId:string | number = action.payload.pageWebview.id
      let webviewData:WebviewData = state.entities[pageId].webviewData //init data from state
      for(let itemKey in action.payload.pageWebview.changes) { //update with update-data
        webviewData[itemKey] = action.payload.pageWebview.changes[itemKey]
      }
      let update:Update<PageModel> = { //set new main update for webviewdata
        id: pageId as string,
        changes: {
          webviewData
        }
      }
      return pageAdapter.updateOne(update, state);
    }
    case PageActionTypes.UpdatePages: {
      //TODO: Check, get current page check if x,y or tab ref. was changed and check multiple
      return pageAdapter.updateMany(action.payload.pages, state);
    }
    case PageActionTypes.DeletePage: {
      return pageAdapter.removeOne(action.payload.id, state);
    }
    case PageActionTypes.DeletePages: {
      return pageAdapter.removeMany(action.payload.ids, state);
    }
    case PageActionTypes.LoadPages: {
      return pageAdapter.addAll(action.payload.pages, state);
    }
    case PageActionTypes.ClearPages: {
      return pageAdapter.removeAll(state);
    }
    case PageActionTypes.SetActivePage: {
      if(action.payload.active) {
        return {...state, options: { ... state.options, activePage: action.payload.pageId }}
      } else {
        if(state.options.activePage==action.payload.pageId) { //check that current active page is pageId
          return {...state, options: { ... state.options, activePage: null }}
        }
        else {
          return state
        }
      }
    }
    default: {
      return state;
    }
  }
}