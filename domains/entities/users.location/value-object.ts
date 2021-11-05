import { ValueObject } from 'domains/core/entity/value-object';
import type { UserLocationType } from 'domains/entities/users.location/type';

class UserLocationValueObject extends ValueObject<UserLocationType> {
    static factory(location: UserLocationType) {
        return new UserLocationValueObject(location);
    }
}

export { UserLocationValueObject };
