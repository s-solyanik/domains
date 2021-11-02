import { Observable, switchMap, of } from "rxjs";
import { map, tap, take } from "rxjs/operators";

import { FAILURE_MESSAGE, Result } from "utils/result/dto";
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
    unitId(id: string|number): IdentifierI
    read(): Observable<Result<Entity<any>[], FAILURE_MESSAGE>>
    sort?: SORT
    create?: (value: T) => Observable<Result<Entity<any>, FAILURE_MESSAGE>>
    update?: (id: number|string, value: Partial<T>) => Observable<Result<Entity<any>, FAILURE_MESSAGE>>
    delete?: (id: number|string) => Observable<Result<boolean, FAILURE_MESSAGE>>
}

class EntityArrayWithState<EntityT extends Entity<any>[], ValueT> {
    private readonly entities: EntityArrayI<ValueT>;
    private readonly state: StateRecord<Result<EntityT, FAILURE_MESSAGE>>;

    constructor(entities: EntityArrayI<ValueT>) {
        this.entities = entities;
        this.state = Domains.shared().state<Result<EntityT, FAILURE_MESSAGE>>(this.entities.id, this.read);
    }

    private items() {
        return this.state.origin([]).pipe(
            take(1),
            map(it => it as unknown as Result<EntityT, FAILURE_MESSAGE>)
        );
    }

    private read = () => {
        return this.entities.read().pipe(
            map((it) => ({
                data: it.isSuccessful ? Result.success(it.value as unknown as EntityT) : Result.failure(it.error),
                expiration: this.entities.ttl
            }))
        )
    }

    public get id() {
        return this.entities.id;
    }

    public data(): Observable<Result<ValueT[], FAILURE_MESSAGE>> {
        return this.state.data().pipe(
            map(it => it.isSuccessful ? Result.success(it.value.map(entity => entity.get())) : Result.failure(it.error))
        );
    }

    public create(value: ValueT) {
        if(!this.entities.create) {
            throw new Error('Method is not implemented');
        }

        return this.entities.create(value).pipe(
            switchMap( (it) => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error))
                }

                const created = it.value;

                return this.items().pipe(
                    tap((it) => {
                        if(!it.isSuccessful) {
                            return;
                        }
                        const state = this.entities.sort === SORT.ASC ? [created, ...it.value] : it.value.concat(created);
                        this.state.update(Result.success(state as unknown as EntityT), this.entities.ttl);
                    }),
                    map(it => it.isSuccessful ? Result.success(true) : Result.failure(it.error))
                );
            })
        )
    }

    public update(id: number|string, value: Partial<ValueT>) {
        if(!this.entities.update) {
            throw new Error('Method is not implemented');
        }

        return this.entities.update(id, value).pipe(
            switchMap( (it) => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error))
                }

                const updated = it.value;

                return this.items().pipe(
                    tap((it) => {
                        if(!it.isSuccessful) {
                            return;
                        }
                        const state = it.value.map(entity => this.entities.unitId(id).equals(entity.id) ? updated : entity);
                        this.state.update(Result.success(state as unknown as EntityT), this.entities.ttl);
                    }),
                    map(it => it.isSuccessful ? Result.success(true) : Result.failure(it.error))
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
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error))
                }

                return this.items().pipe(
                    tap((it) => {
                        if(!it.isSuccessful) {
                            return;
                        }
                        const state = it.value.filter(entity => !this.entities.unitId(id).equals(entity.id));
                        this.state.update(Result.success(state as unknown as EntityT), this.entities.ttl);
                    }),
                    map(it => it.isSuccessful ? Result.success(true) : Result.failure(it.error))
                );
            })
        )
    }
}

export { EntityArrayWithState };