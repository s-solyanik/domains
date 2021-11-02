import { ValueObject } from 'domains/core/entity/value-object';
import type { UserDevices } from 'domains/common/users.devices/type';

class UserDevicesValueObject extends ValueObject<UserDevices> {
    static factory(preference: UserDevices): UserDevicesValueObject {
        return new UserDevicesValueObject(preference);
    }
}

export { UserDevicesValueObject };
