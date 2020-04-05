import { Action, createAction, props } from "@ngrx/store"
import { Update } from "@ngrx/entity"
import { PageModel, WebviewData } from "./page.model"
import * as uuid from "uuid"
import * as _ from "lodash-es"
import { actionStringCreator } from "../state.utils"

const actionStr = actionStringCreator("Page")

/**
 * Add more then one Page
 * @param payload.page the pages for add
 */
export const loadPages = createAction(actionStr("Load Pages"), props<{ pages: PageModel[] }>())

/**
 * Add one Page
 * @param payload.page the page for add
 */
export const addPage = createAction(actionStr("Add Page"), (page: PageModel): { page: PageModel } => ({
    page: {
        ...page,
        id: uuid.v4(),
    },
}))

/**
 * Set Page active (only one page could be active at the same time)
 * @param payload.pageId the page id
 * @param payload.active set active (true) or deactive (false)
 */
export const setActivePage = createAction(
    actionStr("Set Page Activ State"),
    props<{ pageId: string; active: boolean }>()
)

/**
 * Add or update a page
 * @param payload.page the added or updated page
 */
export const upsertPage = createAction(actionStr("Upsert Page"), props<{ page: PageModel }>())

/**
 * Add Pages and set uuid
 * @param payload.pages the added pages
 */
export const addPages = createAction(actionStr("Add Pages"), (pages: PageModel[]): { pages: PageModel[] } => ({
    pages: _.map(pages, (page: PageModel) => ({ ...page, id: uuid.v4() })),
}))

/**
 * Update one Page
 * @param payload.page the update page
 */
export const updatePage = createAction(actionStr("Update Page"), props<{ page: Update<PageModel> }>())

/**
 * Update one pageWebview
 * @param payload.pageWebview the update pageWebview
 */
// export const updatePageWebviewData = createAction(
//     actionStr("Update Page Webview Data"),
//     props<{ pageWebview: Update<WebviewData> }>()
// )

/**
 * Delete page
 * @param payload.id delete the page with id
 */
export const deletePage = createAction(actionStr("Delete Page"), props<{ id: string }>())

export const clearPages = createAction(actionStr("Clear Pages"))
