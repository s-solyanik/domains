import { switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import type { EntityI } from "domains/core/entity/with-state";
import { EntityWithState } from "domains/core/entity/with-state";

import type { FingerprintType } from "domains/entities/users.fingerprint";
import { UserFingerprintEntity } from "domains/entities/users.fingerprint";

import { FingerprintData } from "data/fingerprint";

class UserFingerPrintAggregate implements EntityI<UserFingerprintEntity, FingerprintType> {
    static shared = singleton((id: string) => {
        return new EntityWithState<UserFingerprintEntity, FingerprintType>(new UserFingerPrintAggregate(id))
    })

    public readonly id: IdentifierI;
    public readonly ttl = 300;

    constructor(id: string) {
        this.id = UserFingerprintEntity.id(id);
    }

    public read = () => {
        return FingerprintData.facade.read().pipe(
            switchMap(it => EntityResult.unit(UserFingerprintEntity.factory, it))
        )
    }

    public update(value: Partial<FingerprintType>) {
        return FingerprintData.facade.update(value).pipe(
            switchMap(it => EntityResult.unit(UserFingerprintEntity.factory, it))
        )
    }
}

export type { FingerprintType };
export { UserFingerPrintAggregate };