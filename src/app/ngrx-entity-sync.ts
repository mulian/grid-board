import { Store, select } from "@ngrx/store";
import { AppState } from "./states/reducers";
import { OutputSelector } from "reselect";
import * as _ from 'lodash-es'

export default class NgrxEntitySync<EntityClass> {
    private syncedDataArray: EntityClass[] = []
    constructor(private store: Store<AppState>, private selector: any,private getEntityId:any) {
        this.store.pipe(select(selector)).subscribe((entities: { [key: string]: EntityClass }) => {
            for (let entityKey in entities) {
                let entity: EntityClass = entities[entityKey]
                
                this.syncEntity(entityKey, entity)
                this.syncDeletedEntity(entities)
            }
        })
    }

    private getSyncedEntityIndex(id: string): number {
        return _.findIndex(this.syncedDataArray, function (o) { return o.id == id });
    }

    private syncEntity(key: string, entity: EntityClass) {
        let syncedEntity: EntityClass = this.syncedDataArray[this.getSyncedEntityIndex(key)]
        if (syncedEntity!=null) {
            this.updateEntity(key, entity, syncedEntity)
        } else {
            this.addEntity(key, entity)
        }
    }
    private updateEntity(key: string, entity: EntityClass, syncedEntity: EntityClass) {
        for (let entityKey in entity) {
            if (!(entityKey in syncedEntity)) { //if key is not in synced entity
                syncedEntity[entityKey] = entity[entityKey]
            } else if (syncedEntity[entityKey] != entity[entityKey]) { //if synced entity value is not same as entity
                syncedEntity[entityKey] = entity[entityKey]
            }
        }
    }
    private syncDeletedEntity(entities: { [key: string]: EntityClass }) {
        
        
        for (let index=0; index<this.syncedDataArray.length;index++) {
            let syncedEntity = this.syncedDataArray[index]
            if(!(this.getEntityId(syncedEntity) in entities)) {
                this.syncedDataArray.splice(index,1)
            }
        }
    }
    private addEntity(key: string, entity: EntityClass) {
        this.syncedDataArray = [
            ...this.syncedDataArray, entity
        ]
    }
    public getSyncedData(): EntityClass[] {
        return this.syncedDataArray
    }
}