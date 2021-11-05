import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserLocationType } from 'domains/entities/users.location/type';
import { UserLocationValueObject } from 'domains/entities/users.location/value-object';

interface UserLocationProps {
    readonly id: IdentifierI
    readonly value: UserLocationValueObject
}

class UserLocationEntity extends Entity<UserLocationProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserLocationEntity.createId(`users.location.${id}`);
    }

    static factory(props: UserLocationType) {
        return new UserLocationEntity({
            id: UserLocationEntity.id(`${props.id}`),
            value: UserLocationValueObject.factory(props)
        });
    }
}

export { UserLocationEntity };
