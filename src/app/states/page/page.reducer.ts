import { PageActions, PageActionTypes } from './page.actions';
import { PageState } from './page.state'
import { pageAdapter } from './page.adapter';
import { pageInitialState } from './page.initial.state';

/** The Page reducer */
export function pageReducer(
  state = pageInitialState,
  action: PageActions
): PageState {
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
      return pageAdapter.updateOne(action.payload.page, state);
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