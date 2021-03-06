import { Observable, of} from "rxjs";
import {map, tap, switchMap, take} from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

import { EntityResult } from "domains/core/entity/result";
import type { StateRecord } from "domains/core/state/record";

import { Domains } from "domains/core/domains/application";

type ResultWrapper<T> = Result<T, FAILURE_MESSAGE>;

class State<T> {
    private readonly ttl: number;
    private readonly record: StateRecord<ResultWrapper<T>>

    constructor(
        id: IdentifierI,
        actualize: () => Observable<ResultWrapper<T>>,
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

    public origin() {
        return this.record.origin().pipe(
            take(1),
            map(it => it)
        );
    }

    public data(): Observable<ResultWrapper<T>> {
        return this.record.data().pipe(
            map((it) => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                const value = it.value;

                if(!value) {
                    return Result.failure({
                        status: 404,
                        message: 'Record not found'
                    })
                }

                return Result.success(value as T);
            })
        );
    }

    public update = (updated: ResultWrapper<T>) => {
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

export { State };