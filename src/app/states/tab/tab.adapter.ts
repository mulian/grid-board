import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { Tab } from './tab.model'

export const adapter: EntityAdapter<Tab> = createEntityAdapter<Tab>({
    selectId: (tab) => tab.id,
    sortComparer: (a: Tab, b: Tab) => {
        return a.sortNumber - b.sortNumber;
    }
});