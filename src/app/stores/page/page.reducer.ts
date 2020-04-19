import {
    loadPages,
    addPage,
    setActivePage,
    upsertPage,
    addPages,
    updatePage,
    deletePage,
    clearPages,
} from "./page.actions"
import { PageState } from "./page.state"
import { pageAdapter } from "./page.adapter"
import { pageInitialState } from "./page.initial.state"
import { PageModel, WebviewData } from "./page.model"
import { Update } from "@ngrx/entity"
import { createReducer, on } from "@ngrx/store"

function resetScrollWhenNavigate(page: Update<PageModel>): Update<PageModel> {
    if (page.changes.url != null) {
        let webviewChanges: Partial<WebviewData> = {
            scrollX: 0,
            scrollY: 0,
        }
        page.changes.webviewData = webviewChanges as WebviewData
    }
    return page
}

export const pageReducer = createReducer(
    pageInitialState,
    on(loadPages, (state, { pages }) => pageAdapter.addAll(pages, state)),
    on(addPage, (state, { page }) => {
        console.log(page)

        return pageAdapter.addOne(page, state)
    }),
    on(setActivePage, (state, { pageId, active }) => {
        if (active) {
            return { ...state, options: { ...state.options, activePage: pageId } }
        } else {
            if (state.options.activePage == pageId) {
                //check that current active page is pageId
                return { ...state, options: { ...state.options, activePage: null } }
            } else {
                return state
            }
        }
    }),
    on(upsertPage, (state, { page }) => pageAdapter.upsertOne(page, state)),
    on(addPages, (state, { pages }) => pageAdapter.addMany(pages, state)),
    on(updatePage, (state, { page }) => {
        console.log("update page", page)

        return pageAdapter.updateOne(page, state)
    }),
    on(deletePage, (state, { id }) => pageAdapter.removeOne(id, state)),
    on(clearPages, state => pageAdapter.removeAll(state))
)

/** The Page reducer */
export function pageReducer_(state = pageInitialState, action: any): PageState {
    return pageReducer(state, action)
}
