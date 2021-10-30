import {Observable} from "rxjs";
import {map, take, tap} from "rxjs/operators";

import {IdentifierI} from "utils/unique-id";

import type {StateRecord} from "domains/core/state/record";
import { domainsEntry } from 'domains/core/entry';

import type { FingerprintType } from "domains/common/users.fingerprint";
import { UserFingerprintEntity } from "domains/common/users.fingerprint";

import { FingerprintData } from "data/fingerprint";

export type FiltersProps = {
    page: number
    perPage: number
}

interface EntityTestI<T> {
    id: IdentifierI
    read(): Observable<{ data: UserFingerprintEntity, expiration: number }>
}

const TTL = 300;

class EntityTest implements EntityTestI<UserFingerprintEntity> {
    private readonly filters: FiltersProps;
    private readonly record: StateRecord<UserFingerprintEntity>;

    constructor(userId: string, filters: FiltersProps) {
        this.filters = filters;
        this.record = domainsEntry.entity<UserFingerprintEntity>(UserFingerprintEntity.id(userId), this.read);
    }

    public read = () => {
        return FingerprintData.facade.read(this.filters).pipe(
            map(it => ({
                data: UserFingerprintEntity.factory(it),
                expiration: TTL
            }))
        )
    }

    public get id() {
        return this.record.id;
    }

    public data() {
        return this.record.data().pipe(
            map(it => it.value.get())
        );
    }

    public update(value: FingerprintType) {
        this.record.data().pipe(
            take(1),
            tap(it => {
                const entity = UserFingerprintEntity.factory({
                    ...it.value.get(),
                    ...value
                });

                this.record.update(entity, TTL);
            }),
        ).subscribe((it) => ({}));
    }
}

export { EntityTest };