import { Store, select } from "@ngrx/store"
import { AppState } from "./states/reducers"
import * as _ from "lodash-es"

export default class NgrxEntitySync<EntityClass> {
    private _syncedDataArray: EntityClass[] = []
    constructor(private store: Store<AppState>, private selector: any, private getEntityId: any) {
        this.store.pipe(select(selector)).subscribe((entities: { [key: string]: EntityClass }) => {
            for (let entityKey in entities) {
                let entity: EntityClass = { ...entities[entityKey] }

                this.syncEntity(entityKey, entity)
                this.syncDeletedEntity(entities)
            }
        })
    }

    private getSyncedEntityIndex(id: string): number {
        return _.findIndex(this._syncedDataArray, function (o) {
            return o.id == id
        })
    }

    private syncEntity(key: string, entity: EntityClass) {
        let syncedEntity: EntityClass = this._syncedDataArray[this.getSyncedEntityIndex(key)]
        if (syncedEntity != null) {
            this.updateEntity(entity, syncedEntity)
        } else {
            this.addEntity(entity)
        }
    }
    private updateEntity(entity: EntityClass, syncedEntity: EntityClass) {
        for (let entityKey in entity) {
            if (!(entityKey in syncedEntity) && syncedEntity[entityKey] != entity[entityKey]) {
                //if key is not in synced entity and if synced entity value is not same as entity
                syncedEntity = { ...syncedEntity, entityKey: entity[entityKey] }
            }
        }
    }
    private syncDeletedEntity(entities: { [key: string]: EntityClass }) {
        for (let index = 0; index < this._syncedDataArray.length; index++) {
            let syncedEntity = this._syncedDataArray[index]
            if (!(this.getEntityId(syncedEntity) in entities)) {
                this._syncedDataArray.splice(index, 1)
            }
        }
    }
    private addEntity(entity: EntityClass) {
        this._syncedDataArray = [...this._syncedDataArray, { ...entity }]
    }
    public getSyncedData(): EntityClass[] {
        return this._syncedDataArray
    }
}
