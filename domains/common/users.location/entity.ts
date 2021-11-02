import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserLocation } from 'domains/common/users.location/type';
import { UserLocationValueObject } from 'domains/common/users.location/value-object';

interface UserLocationProps {
    readonly id: IdentifierI
    readonly value: UserLocationValueObject
}

class UserLocationEntity extends Entity<UserLocationProps> {
    public update(value: Partial<Omit<UserLocation, 'userId'>>) {
        const { userId, ...rest } = this.get();
        return UserLocationEntity.factory(userId, {
            ...rest,
            ...value
        });
    }

    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserLocationEntity.createId(`users.location.${id}`);
    }

    static factory(id: string, props: Omit<UserLocation, 'userId'>) {
        return new UserLocationEntity({
            id: UserLocationEntity.id(id),
            value: UserLocationValueObject.factory({
                userId: id,
                ...props
            })
        });
    }
}

export { UserLocationEntity };
