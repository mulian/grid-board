import * as tabStore from './tab';
import * as pageStore from './page';

export const tabs = {
    selectAll: tabStore.selectAll,
    selectEntities: tabStore.selectEntities,
    selectIds: tabStore.selectIds,
    selectTotal: tabStore.selectTotal,
}

export const pages = {
    selectAll: pageStore.selectAll,
    selectEntities: pageStore.selectEntities,
    selectIds: pageStore.selectIds,
    selectTotal: pageStore.selectTotal,
}