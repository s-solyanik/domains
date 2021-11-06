import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserDevicesType } from 'domains/entities/users.devices/type';
import { UserDevicesValueObject } from 'domains/entities/users.devices/value-object';

interface UserDevicesProps {
    readonly id: IdentifierI
    readonly value: UserDevicesValueObject
}

class UserDevicesEntity extends Entity<UserDevicesProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserDevicesEntity.createId(`users.devices.${id}`);
    }

    static factory(props: UserDevicesType) {
        return new UserDevicesEntity({
            id: UserDevicesEntity.id(`${props.id}`),
            value: UserDevicesValueObject.factory(props)
        });
    }
}

export { UserDevicesEntity };
