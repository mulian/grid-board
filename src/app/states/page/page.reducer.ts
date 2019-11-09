import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Page } from './page.model';
import { PageActions, PageActionTypes } from './page.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const pagesFeatureKey = 'pages';

export interface State extends EntityState<Page> {
  // additional entities state properties
  
}

export const adapter: EntityAdapter<Page> = createEntityAdapter<Page>({
  selectId: (page) => page.id
});

export const initialState: State = adapter.getInitialState({
  
});

export function reducer(
  state = initialState,
  action: PageActions
): State {
  function gotStateAlreadyPageSOnColumn(newPages:Page[]):boolean {
    for(let newPageId in newPages) {
      let newPage:Page = newPages[newPageId]
      if(gotStateAlreadyPageOnColumn(newPage)) {
        return true
      }
    }
    return false;
  }
  function gotStateAlreadyPageOnColumn(newPage:Page):boolean {
    for(let pageId in state.entities) {
      let page:Page = state.entities[pageId]
      if(page.tab==newPage.tab && page.x == newPage.x && page.y==newPage.y) {
        return true;
      }
    }
    return false;
  }
  switch (action.type) {
    case PageActionTypes.AddPage: {
      if(!gotStateAlreadyPageOnColumn(action.payload.page)) {
        return adapter.addOne(action.payload.page, state);
      } else {
        //TODO: Raise error
        return state
      }
    }

    case PageActionTypes.UpsertPage: {
      return adapter.upsertOne(action.payload.page, state);
    }

    case PageActionTypes.AddPages: {
      if(!gotStateAlreadyPageSOnColumn(action.payload.pages)) {
        return adapter.addMany(action.payload.pages, state);
      } else {
        //TODO: Raise error
        return state
      }
    }

    case PageActionTypes.UpsertPages: {
      return adapter.upsertMany(action.payload.pages, state);
    }

    case PageActionTypes.UpdatePage: {
      //TODO: Check, get current page check if x,y or tab ref. was changed and check
      return adapter.updateOne(action.payload.page, state);
    }

    case PageActionTypes.UpdatePages: {
      //TODO: Check, get current page check if x,y or tab ref. was changed and check multiple
      return adapter.updateMany(action.payload.pages, state);
    }

    case PageActionTypes.DeletePage: {
      return adapter.removeOne(action.payload.id, state);
    }

    case PageActionTypes.DeletePages: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case PageActionTypes.LoadPages: {
      return adapter.addAll(action.payload.pages, state);
    }

    case PageActionTypes.ClearPages: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();