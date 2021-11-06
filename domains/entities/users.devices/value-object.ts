import { ValueObject } from 'domains/core/entity/value-object';
import type { UserDevicesType } from 'domains/entities/users.devices/type';

class UserDevicesValueObject extends ValueObject<UserDevicesType> {
    static factory(devices: UserDevicesType) {
        return new UserDevicesValueObject(devices);
    }
}

export { UserDevicesValueObject };
