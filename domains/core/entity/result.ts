import { FAILURE_MESSAGE, Result } from "utils/result/dto";

import { Entity } from "domains/core/entity/index";

type Factory<T> = (args: any) => T

class EntityResult {
    static createArray<T extends Entity<any>, Type extends any>(factory: Factory<T>, it: Result<Type[], FAILURE_MESSAGE>) {
        if(!it.isSuccessful) {
            return Result.failure(it.error);
        }

        return Result.success(it.value.map(factory));
    }

    static create<T extends Entity<any>, Type extends any>(factory: Factory<T>, it: Result<Type, FAILURE_MESSAGE>) {
        if(!it.isSuccessful) {
            return Result.failure(it.error);
        }

        return Result.success(factory(it.value));
    }

    static errorOrSuccess(it: Result<any, FAILURE_MESSAGE>) {
        return it.isSuccessful ? Result.success(true) : Result.failure(it.error)
    }
}

export { EntityResult }