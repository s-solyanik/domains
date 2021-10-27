import {IdentifierI, UID} from "utils/unique-id";

import { Entity } from 'domains/core/entity';

import type { FingerprintType } from 'domains/common/users.fingerprint/type';
import { UserFingerprintValueObject } from 'domains/common/users.fingerprint/value-object';

interface UserFingerprintProps {
    readonly id: IdentifierI
    readonly value: UserFingerprintValueObject
}

class UserFingerprintEntity extends Entity<UserFingerprintProps> {
    public get() {
        return this.value.get();
    }

    public update(value: Partial<FingerprintType>) {
        return UserFingerprintEntity.factory({
            ...this.get(),
            ...value
        });
    }

    static id(user: string) {
        return UID.factory(UserFingerprintEntity.idName, `users.fingerprint.${user}`);
    }

    static factory(props: FingerprintType) {
        return new UserFingerprintEntity({
            id: UserFingerprintEntity.id(props.user),
            value: UserFingerprintValueObject.factory(props)
        });
    }
}

export { UserFingerprintEntity };
