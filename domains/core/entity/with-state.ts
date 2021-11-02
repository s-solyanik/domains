import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

import type { StateRecord } from "domains/core/state/record";
import { Entity } from "domains/core/entity/index";

import { Domains } from "domains/core/domains/application";
import {IdentifierI} from "utils/unique-id";

type State = Result<Entity<any>, FAILURE_MESSAGE>;

export interface EntityI<T> {
    id: IdentifierI
    ttl: number
    read(): Observable<State>
    create?: (value: T) => Observable<State>
    update?: (value: Partial<T>) => Observable<State>
    delete?: (id: number|string) => Observable<Result<boolean, FAILURE_MESSAGE>>
}

class EntityWithState<EntityT extends Entity<any>, ValueT> {
    private readonly entity: EntityI<ValueT>;
    private readonly state: StateRecord<Result<EntityT, FAILURE_MESSAGE>>

    constructor(entity: EntityI<ValueT>) {
        this.entity = entity;
        this.state = Domains.shared().state<Result<EntityT, FAILURE_MESSAGE>>(this.entity.id, this.read);
    }

    private read = () => {
        return this.entity.read().pipe(
            map(it => ({
                data: it.isSuccessful ? Result.success(it as unknown as EntityT) : Result.failure(it.error),
                expiration: this.entity.ttl
            }))
        )
    }

    public get id() {
        return this.entity.id;
    }

    public data(): Observable<Result<ValueT, FAILURE_MESSAGE>> {
        return this.state.data().pipe(
            map(it => it.isSuccessful ? Result.success(it.value.get()) : Result.failure(it.error))
        );
    }

    public create(value: ValueT) {
        if(!this.entity.create) {
            throw new Error('Method is not implemented');
        }

        return this.entity.create(value).pipe(
            tap((it) => {
                if(!it.isSuccessful) {
                    return;
                }
                this.state.update(Result.success(it.value as unknown as EntityT), this.entity.ttl)
            }),
            map(it => it.isSuccessful ? Result.success(true) : Result.failure(it.error))
        )
    }

    public update(value: Partial<ValueT>) {
        if(!this.entity.update) {
            throw new Error('Method is not implemented');
        }

        return this.entity.update(value).pipe(
            tap((it) => {
                if(!it.isSuccessful) {
                    return;
                }
                this.state.update(Result.success(it.value as unknown as EntityT), this.entity.ttl);
            }),
            map(it => it.isSuccessful ? Result.success(true) : Result.failure(it.error))
        )
    }

    public delete(id: number|string) {
        if(!this.entity.delete) {
            throw new Error('Method is not implemented');
        }

        return this.entity.delete(id).pipe(
            tap((it) => {
                if(!it.isSuccessful) {
                    return;
                }
                this.state.delete();
            }),
            map(it => it.isSuccessful ? Result.success(true) : Result.failure(it.error))
        )
    }
}

export { EntityWithState };