import { Observable, switchMap } from "rxjs";
import { map, tap, take } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";

import type { StateRecord } from "domains/core/state/record";
import { Entity } from "domains/core/entity/index";

import { Domains } from "domains/core/domains/application";

export enum SORT {
    ASC,
    DESC
}

export interface EntityArrayI<T> {
    id: IdentifierI
    ttl: number
    unitId(props: T): IdentifierI
    read(): Observable<Entity<any>[]>
    sort?: SORT
    create?: (value: T) => Observable<Entity<any>>
    update?: (id: number|string, value: Partial<T>) => Observable<Entity<any>>
    delete?: (id: number|string) => Observable<IdentifierI>
}

class EntityArrayWithState<EntityT extends Entity<any>[], ValueT> {
    private readonly entities: EntityArrayI<ValueT>;
    private readonly state: StateRecord<EntityT>;

    constructor(entities: EntityArrayI<ValueT>) {
        this.entities = entities;
        this.state = Domains.shared().state<EntityT>(this.entities.id, this.read);
    }

    //TODO create safe get for origin state which will work without actualize request
    private items() {
        return this.state.origin([]).pipe(take(1));
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
            map(it => it.map(entity => entity.get()))
        );
    }

    public create(value: ValueT) {
        if(!this.entities.create) {
            throw new Error('Method is not implemented');
        }

        return this.entities.create(value).pipe(
            switchMap( (it) => {
                return this.items().pipe(
                    tap((items) => {
                        const state = this.entities.sort === SORT.ASC ? [it, ...items] : items.concat(it);
                        this.state.update(state as EntityT, this.entities.ttl)
                    }),
                    map(() => true)
                );
            })
        )
    }

    public update(id: number|string, value: Partial<ValueT>) {
        if(!this.entities.update) {
            throw new Error('Method is not implemented');
        }

        return this.entities.update(id, value).pipe(
            switchMap( (updatedEntity) => {
                return this.items().pipe(
                    tap((items) => {
                        const state = items.map(entity => entity.id.equals(updatedEntity.id) ? updatedEntity :  entity);
                        this.state.update(state as EntityT, this.entities.ttl)
                    }),
                    map(() => true)
                );
            })
        )
    }

    public delete(id: number|string) {
        if(!this.entities.delete) {
            throw new Error('Method is not implemented');
        }

        return this.entities.delete(id).pipe(
            switchMap( (it) => {
                return this.items().pipe(
                    tap((items) => {
                        const state = items.filter(entity => !entity.id.equals(it));
                        this.state.update(state as EntityT, this.entities.ttl)
                    }),
                    map(() => true)
                );
            })
        )
    }
}

export { EntityArrayWithState };