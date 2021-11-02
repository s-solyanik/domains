import {map} from "rxjs/operators";

import {Result} from "utils/result/dto";

import type {IdentifierI} from "utils/unique-id";

import type { EntityI } from "domains/core/entity/with-state";

import type { FingerprintType } from "domains/common/users.fingerprint";
import { UserFingerprintEntity } from "domains/common/users.fingerprint";

import { FingerprintData } from "data/fingerprint";

class UserFingerPrint implements EntityI<FingerprintType> {
    public readonly id: IdentifierI;
    public readonly ttl = 300;

    constructor(id: string) {
        this.id = UserFingerprintEntity.id(id);
    }

    public read = () => {
        return FingerprintData.facade.read().pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success(UserFingerprintEntity.factory(it.value))
            })
        )
    }

    public update(value: Partial<FingerprintType>) {
        return FingerprintData.facade.update(value).pipe(
            map(it => {
                if(!it.isSuccessful) {
                    return Result.failure(it.error);
                }

                return Result.success(UserFingerprintEntity.factory(it.value))
            })
        )
    }
}

export type { FingerprintType };
export { UserFingerPrint };