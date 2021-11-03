import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { FAILURE_MESSAGE, Result } from "utils/result/dto";

import { Entity } from "domains/core/entity/index";

type Factory<T> = (args: any) => T

class EntityResult {
    static createArray<T extends Entity<any>, Type extends any>(factory: Factory<T>, it: Result<{ items: Type[], total: number }, FAILURE_MESSAGE>) {
        return of(undefined).pipe(
            map(() => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success({
                    items: it.value.items.map(factory),
                    total: it.value.total
                });
            })
        );
    }

    static create<T extends Entity<any>, Type extends any>(factory: Factory<T>, it: Result<Type, FAILURE_MESSAGE>) {
        return of(undefined).pipe(
            map(() => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success(factory(it.value));
            })
        );
    }

    static errorOrSuccess(it: Result<any, FAILURE_MESSAGE>) {
        return of(undefined).pipe(
            map(() => it.isSuccessful ? Result.success(true) : Result.failure(it.error))
        );
    }
}

export { EntityResult }