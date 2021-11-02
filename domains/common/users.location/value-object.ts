import { ValueObject } from 'domains/core/entity/value-object';
import type { UserLocation } from 'domains/common/users.location/type';

class UserLocationValueObject extends ValueObject<UserLocation> {
    static factory(location: UserLocation): UserLocationValueObject {
        return new UserLocationValueObject(location);
    }
}

export { UserLocationValueObject };
