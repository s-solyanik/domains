import {switchMap} from "rxjs";
import {map, tap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";

import { domainsEntry } from 'domains/core/singleton';

import type { FingerprintType } from "domains/common/users.fingerprint";
import { UserFingerprintEntity } from "domains/common/users.fingerprint";

import { FingerprintData } from "data/fingerprint";
import {singleton} from "utils/singleton";

type FiltersProps = {
    page: number
    perPage: number
}

const TTL = 300;

class UserFingerPrint {
    static shared = singleton((id: string, filters: FiltersProps) => new UserFingerPrint(id, filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;

    private constructor(id: string, filters: FiltersProps) {
        this.id = UserFingerprintEntity.id(id);
        this.filters = filters;
    }

    private get entity() {
        return domainsEntry.entity<UserFingerprintEntity>(this.id, this.read);
    }

    private read = () => {
        return FingerprintData.facade.read(this.filters).pipe(
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
                    map(it => {
                        return UserFingerprintEntity.factory({
                            ...it.value.get(),
                            ...update
                        });
                    })
                )
            }),
            tap(entity => this.entity.update(entity, TTL)),
        )
    }
}

export type { FingerprintType, FiltersProps };
export { UserFingerPrint };