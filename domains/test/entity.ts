import {Observable} from "rxjs";
import {map, take, tap} from "rxjs/operators";

import {IdentifierI} from "utils/unique-id";

import type {StateRecord} from "domains/core/state/record";
import { domains } from 'domains/core/domains';

import type { FingerprintType } from "domains/common/users.fingerprint";
import { UserFingerprintEntity } from "domains/common/users.fingerprint";

type FiltersProps = {
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
        this.record = domains.entity<UserFingerprintEntity>(UserFingerprintEntity.id(userId), this.read);
    }

    private read = () => {
        console.log('request with filters', this.filters);

        return new Observable<UserFingerprintEntity>(observer => {
            observer.next(
                UserFingerprintEntity.factory({
                    guid: 'test',
                    user: 'user-1',
                    client: 'web_01'
                })
            );
            observer.complete();
        })
    }

    public get id() {
        return this.record.id;
    }

    public data() {
        return this.record.data().pipe(
            map(it => {
                return it.value.get();
            })
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
            })
        ).subscribe((it) => ({}));
    }
}

export { EntityTest };