import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { FAILURE_MESSAGE, Result } from "utils/result/dto";

import type { Entity as AbstractEntity} from "domains/core/entity/index";

type Factory<Entity, ObjectValue> = (args: ObjectValue) => Entity;
type ResultWrapper<T> = Result<T, FAILURE_MESSAGE>;

class EntityResult {
    static array<Entity extends AbstractEntity<any>, ObjectValue extends any>(
        factory: Factory<Entity, ObjectValue>,
        it: ResultWrapper<{ items: ObjectValue[], total: number }>
    ) {
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

    static unit<Entity extends AbstractEntity<any>, ObjectValue extends any>(
        factory:  Factory<Entity, ObjectValue>,
        it: ResultWrapper<ObjectValue>
    ) {
        return of(undefined).pipe(
            map(() => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success(factory(it.value));
            })
        );
    }

    static arrayGet<Entity extends AbstractEntity<any>, ObjectValue extends any>(it: ResultWrapper<{ items: Entity[], total: number }>) {
        return of(undefined).pipe(
            map(() => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success({
                    items: it.value.items.map(item => item.get() as ObjectValue),
                    total: it.value.total
                });
            })
        );
    }

    static errorOrSuccess(it: ResultWrapper<any>) {
        return of(undefined).pipe(
            map(() => it.isSuccessful ? Result.success(true) : Result.failure(it.error))
        );
    }
}

export { EntityResult }