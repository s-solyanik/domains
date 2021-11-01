import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import type { StateRecord } from "domains/core/state/record";
import { Entity } from "domains/core/entity/index";

import { Domains } from "domains/core/domains/application";
import {IdentifierI} from "utils/unique-id";

export interface EntityArrayI<T> {
    id: IdentifierI
    ttl: number
    byId(props: T): IdentifierI
    read(): Observable<Entity<any>[]>
    create?: (value: T) => Observable<Entity<any>>
    update?: (value: Partial<T>) => Observable<Entity<any>>
    delete?: (id: number|string) => Observable<boolean>
}

class EntityArrayWithState<EntityT extends Entity<any>[], ValueT> {
    private readonly entities: EntityArrayI<ValueT>;
    private readonly state: StateRecord<EntityT>

    constructor(entities: EntityArrayI<ValueT>) {
        this.entities = entities;
        this.state = Domains.shared().state<EntityT>(this.entities.id, this.read);
    }

    private read = () => {
        return this.entities.read().pipe(
            map((it: EntityT) => ({
                data: it,
                expiration: this.entities.ttl
            }))
        )
    }

    public get id() {
        return this.entities.id;
    }

    public data(): Observable<ValueT[]> {
        return this.state.data().pipe(
            map(it => it.map(entity => entity.value.get()))
        );
    }

    public create(value: ValueT) {
        if(!this.entities.create) {
            throw new Error('Method is not implemented');
        }

        return this.entities.create(value).pipe(
            tap((it) => {
                this.state.update([it] as EntityT, this.entities.ttl)
            }),
            map(() => true)
        )
    }

    public update(value: Partial<ValueT>) {
        if(!this.entities.update) {
            throw new Error('Method is not implemented');
        }

        return this.entities.update(value).pipe(
            tap((it) => {
                this.state.update([it] as EntityT, this.entities.ttl)
            }),
            map(() => true)
        )
    }

    public delete(id: number|string) {
        if(!this.entities.delete) {
            throw new Error('Method is not implemented');
        }

        return this.entities.delete(id).pipe(
            tap(() => {
                this.state.delete()
            }),
            map(() => true)
        )
    }
}

export { EntityArrayWithState };