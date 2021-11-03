import { Observable, switchMap, of } from "rxjs";
import { map, tap, take } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { FAILURE_MESSAGE, Result } from "utils/result/dto";

import { EntityResult } from "domains/core/entity/result";
import type { Entity } from "domains/core/entity/index";
import type { StateRecord } from "domains/core/state/record";
import { Domains } from "domains/core/domains/application";

export enum SORT {
    ASC,
    DESC
}

type ResultWrapper<T> = Result<T, FAILURE_MESSAGE>;

export interface EntityArrayI<EntityType extends Entity<any>, ObjectValueType> {
    id: IdentifierI
    ttl: number
    unitId(id: string|number): IdentifierI
    read(): Observable<ResultWrapper<EntityType[]>>
    sort?: SORT
    create?: (value: ObjectValueType) => Observable<ResultWrapper<EntityType>>
    update?: (id: number|string, value: Partial<ObjectValueType>) => Observable<ResultWrapper<EntityType>>
    delete?: (id: number|string) => Observable<Result<boolean, FAILURE_MESSAGE>>
}

class EntityArrayWithState<EntityType extends Entity<any>, ObjectValueType> {
    private readonly entities: EntityArrayI<EntityType, ObjectValueType>;
    private readonly state: StateRecord<Result<EntityType[], FAILURE_MESSAGE>>;

    constructor(entities: EntityArrayI<EntityType, ObjectValueType>) {
        this.entities = entities;
        this.state = Domains.shared().state(this.entities.id, this.read);
    }

    private items() {
        return this.state.origin([] as unknown as ResultWrapper<EntityType[]>).pipe(take(1));
    }

    private read = () => {
        return this.entities.read().pipe(
            map((it) => ({
                data: it.isSuccessful ? Result.success(it.value) : Result.failure(it.error),
                expiration: this.entities.ttl
            }))
        )
    }

    public get id() {
        return this.entities.id;
    }

    public data() {
        return this.state.data().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success(it.value.map(entity => entity.get() as unknown as ObjectValueType));
            })
        );
    }

    public create(value: ObjectValueType) {
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
                        this.state.update(Result.success(state), this.entities.ttl);
                    }),
                    map(EntityResult.errorOrSuccess)
                );
            })
        )
    }

    public update(id: number|string, value: Partial<ObjectValueType>) {
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
                        this.state.update(Result.success(state), this.entities.ttl);
                    }),
                    map(EntityResult.errorOrSuccess)
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
                        this.state.update(Result.success(state), this.entities.ttl);
                    }),
                    map(EntityResult.errorOrSuccess)
                );
            })
        )
    }
}

export { EntityArrayWithState };