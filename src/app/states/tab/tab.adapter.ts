import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { TabModel } from './tab.model'

export function sortBySortNumber(a: TabModel, b: TabModel):number {
    return a.sortNumber - b.sortNumber;
}

/** 
 * The EntityAdapter for Tab model with
 * * sort: to change the sort of tabs in tabbar
 * * selectId: the id of tab
 */
export const adapter: EntityAdapter<TabModel> = createEntityAdapter<TabModel>({
    selectId: (tab) => tab.id,
    sortComparer: sortBySortNumber
});