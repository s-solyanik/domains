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
    read(): Observable<UserFingerprintEntity>
}

class EntityTest implements EntityTestI<UserFingerprintEntity> {
    private readonly filters: FiltersProps;
    private readonly record: StateRecord<UserFingerprintEntity>;

    constructor(userId: string, filters: FiltersProps) {
        this.filters = filters;
        this.record = domainsEntry.entity<UserFingerprintEntity>(UserFingerprintEntity.id(userId), this.read);
    }

    private read = () => {
        return FingerprintData.facade.read(this.filters).pipe(
            map(it => {
                return UserFingerprintEntity.factory(it)
            })
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
                this.record.update(
                    UserFingerprintEntity.factory({
                        ...it.value.get(),
                        ...value
                    })
                )
            }),
        ).subscribe((it) => ({}));
    }
}

export { EntityTest };