import { Observable, of } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

import { EntityResult } from "domains/core/entity/result";
import type { StateRecord } from "domains/core/state/record";
import { Entity } from "domains/core/entity/index";
import { Domains } from "domains/core/domains/application";

type ResultWrapper<T> = Result<T, FAILURE_MESSAGE>;

class EntityState<EntityType extends Entity<any>, ObjectValueType extends any> {
    private readonly ttl: number;
    private readonly record: StateRecord<ResultWrapper<EntityType>>

    constructor(
        id: IdentifierI,
        actualize: () => Observable<ResultWrapper<EntityType>>,
        ttl= 0
    ) {
        this.ttl = ttl;
        this.record = Domains.shared().state(id, () => {
            return actualize().pipe(
                map(it => ({
                    data: it.isSuccessful ? Result.success(it.value) : Result.failure(it.error),
                    expiration: this.ttl
                }))
            )
        });
    }

    public data(): Observable<ResultWrapper<ObjectValueType>> {
        return this.record.data().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success(it.value.get() as unknown as ObjectValueType);
            })
        );
    }

    public update = (updated: ResultWrapper<EntityType>) => {
        return of(updated).pipe(
            tap((it) => {
                if(!it.isSuccessful) {
                    return;
                }
                this.record.update(Result.success(it.value), this.ttl);
            }),
            switchMap(EntityResult.errorOrSuccess)
        )
    }

    public delete = (it: ResultWrapper<boolean>) => {
        return of(it).pipe(
            tap((it) => {
                if(!it.isSuccessful) {
                    return;
                }
                this.record.delete();
            }),
            switchMap(EntityResult.errorOrSuccess)
        )
    }
}

export { EntityState };