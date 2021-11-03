import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

import { EntityResult } from "domains/core/entity/result";
import type { StateRecord } from "domains/core/state/record";
import { Entity } from "domains/core/entity/index";
import { Domains } from "domains/core/domains/application";

type ResultWrapper<T> = Result<T, FAILURE_MESSAGE>;

export interface EntityI<EntityType extends Entity<any>, ObjectValueType> {
    id: IdentifierI
    ttl: number
    read(): Observable<ResultWrapper<EntityType>>
    create?: (value: ObjectValueType) => Observable<ResultWrapper<EntityType>>
    update?: (value: Partial<ObjectValueType>) => Observable<ResultWrapper<EntityType>>
    delete?: (id: number|string) => Observable<Result<boolean, FAILURE_MESSAGE>>
}

class EntityWithState<EntityType extends Entity<any>, ObjectValueType> {
    private readonly entity: EntityI<EntityType, ObjectValueType>;
    private readonly state: StateRecord<ResultWrapper<EntityType>>

    constructor(entity: EntityI<EntityType, ObjectValueType>) {
        this.entity = entity;
        this.state = Domains.shared().state(this.entity.id, this.read);
    }

    private read = () => {
        return this.entity.read().pipe(
            map(it => ({
                data: it.isSuccessful ? Result.success(it.value) : Result.failure(it.error),
                expiration: this.entity.ttl
            }))
        )
    }

    public get id() {
        return this.entity.id;
    }

    public data(): Observable<ResultWrapper<ObjectValueType>> {
        return this.state.data().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success(it.value.get() as unknown as ObjectValueType);
            })
        );
    }

    public create(value: ObjectValueType) {
        if(!this.entity.create) {
            throw new Error('Method is not implemented');
        }

        return this.entity.create(value).pipe(
            tap((it) => {
                if(!it.isSuccessful) {
                    return;
                }
                this.state.update(Result.success(it.value), this.entity.ttl)
            }),
            map(EntityResult.errorOrSuccess)
        )
    }

    public update(value: Partial<ObjectValueType>) {
        if(!this.entity.update) {
            throw new Error('Method is not implemented');
        }

        return this.entity.update(value).pipe(
            tap((it) => {
                if(!it.isSuccessful) {
                    return;
                }
                this.state.update(Result.success(it.value), this.entity.ttl);
            }),
            map(EntityResult.errorOrSuccess)
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
            map(EntityResult.errorOrSuccess)
        )
    }
}

export { EntityWithState };