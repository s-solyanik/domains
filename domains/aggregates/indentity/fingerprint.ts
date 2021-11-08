import { switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import { State } from "domains/core/state";

import type { FingerprintType } from "domains/entities/users.fingerprint";
import { UserFingerprintEntity } from "domains/entities/users.fingerprint";

import { FingerprintData } from "data/common/identity/fingerprint";

class UserFingerPrintAggregate {
    static shared = singleton(() => new UserFingerPrintAggregate());

    public readonly id: IdentifierI;
    private readonly state: State<UserFingerprintEntity>;

    private constructor() {
        this.id = UserFingerprintEntity.id('owner');
        this.state = new State<UserFingerprintEntity>(this.id, this.read, 300);
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
        return this.state.data().pipe(
            switchMap(it => EntityResult.unitGet<UserFingerprintEntity, FingerprintType>(it)),
        );
    }
}

export type { FingerprintType };
export { UserFingerPrintAggregate };