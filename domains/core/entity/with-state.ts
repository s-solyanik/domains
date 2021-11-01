import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import type { StateRecord } from "domains/core/state/record";
import { Entity } from "domains/core/entity/index";

import { Domains } from "domains/core/domains/application";
import {IdentifierI} from "utils/unique-id";

export interface EntityI<T> {
    id: IdentifierI
    ttl: number
    read(): Observable<Entity<any>>
    create?: (value: T) => Observable<Entity<any>>
    update?: (value: Partial<T>) => Observable<Entity<any>>
    delete?: (id: number|string) => Observable<boolean>
}

class EntityWithState<EntityT extends Entity<any>, ValueT> {
    private readonly entity: EntityI<ValueT>;
    private readonly state: StateRecord<EntityT>

    constructor(entity: EntityI<ValueT>) {
        this.entity = entity;
        this.state = Domains.shared().state<EntityT>(this.entity.id, this.read);
    }

    private read = () => {
        return this.entity.read().pipe(
            map(it => ({
                data: it as EntityT,
                expiration: this.entity.ttl
            }))
        )
    }

    public get id() {
        return this.entity.id;
    }

    public data(): Observable<ValueT> {
        return this.state.data().pipe(
            map(it => it.get())
        );
    }

    public create(value: ValueT) {
        if(!this.entity.create) {
            throw new Error('Method is not implemented');
        }

        return this.entity.create(value).pipe(
            tap((it: EntityT) => {
                this.state.update(it, this.entity.ttl)
            }),
            map(() => true)
        )
    }

    public update(value: Partial<ValueT>) {
        if(!this.entity.update) {
            throw new Error('Method is not implemented');
        }

        return this.entity.update(value).pipe(
            tap((it: EntityT) => {
                this.state.update(it, this.entity.ttl)
            }),
            map(() => true)
        )
    }

    public delete(id: number|string) {
        if(!this.entity.delete) {
            throw new Error('Method is not implemented');
        }

        return this.entity.delete(id).pipe(
            tap(() => {
                this.state.delete()
            }),
            map(() => true)
        )
    }
}

export { EntityWithState };