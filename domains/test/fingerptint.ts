import {switchMap} from "rxjs";
import {map, tap} from "rxjs/operators";

import {singleton} from "utils/singleton";
import type {IdentifierI} from "utils/unique-id";

import { domainsEntry } from 'domains/core/singleton';

import type { FingerprintType } from "domains/common/users.fingerprint";
import { UserFingerprintEntity } from "domains/common/users.fingerprint";

import { FingerprintData } from "data/fingerprint";

const TTL = 300;

class UserFingerPrint {
    static shared = singleton((id: string) => new UserFingerPrint(id));

    public readonly id: IdentifierI;

    private constructor(id: string) {
        this.id = UserFingerprintEntity.id(id);
    }

    private get entity() {
        return domainsEntry.entity<UserFingerprintEntity>(this.id, this.read);
    }

    private read = () => {
        return FingerprintData.facade.read().pipe(
            map(it => ({
                data: UserFingerprintEntity.factory(it),
                expiration: TTL
            }))
        )
    }

    public data() {
        return this.entity.data().pipe(
            map(it => it.value.get())
        );
    }

    public update(value: Partial<FingerprintType>) {
        return FingerprintData.facade.update(value).pipe(
            switchMap((update) => {
                return this.entity.data().pipe(
                    map((it) => it.update(update))
                )
            }),
            tap(entity => this.entity.update(entity, TTL)),
        )
    }
}

export type { FingerprintType };
export { UserFingerPrint };