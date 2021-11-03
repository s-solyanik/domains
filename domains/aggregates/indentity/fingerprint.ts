import { switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import { EntityState } from "domains/core/entity/with-state";

import type { FingerprintType } from "domains/entities/users.fingerprint";
import { UserFingerprintEntity } from "domains/entities/users.fingerprint";

import { FingerprintData } from "data/fingerprint";

class UserFingerPrintAggregate {
    static shared = singleton((id: string) => new UserFingerPrintAggregate(id));

    public readonly id: IdentifierI;
    private readonly state: EntityState<UserFingerprintEntity, FingerprintType>;

    private constructor(id: string) {
        this.id = UserFingerprintEntity.id(id);
        this.state = new EntityState<UserFingerprintEntity, FingerprintType>(this.id, this.read, 300);
    }

    private read = () => {
        return FingerprintData.facade.read().pipe(
            switchMap(it => EntityResult.unit(UserFingerprintEntity.factory, it))
        )
    }

    public update(value: Partial<FingerprintType>) {
        return FingerprintData.facade.update(value).pipe(
            switchMap(it => EntityResult.unit(UserFingerprintEntity.factory, it)),
            switchMap(this.state.update)
        )
    }

    public data() {
        return this.state.data();
    }
}

export type { FingerprintType };
export { UserFingerPrintAggregate };