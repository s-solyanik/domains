import { ValueObject } from 'domains/core/entity/value-object';
import type { UserMediaType } from 'domains/entities/users.media/type';

class UserMediaValueObject extends ValueObject<UserMediaType> {
    static factory(preference: UserMediaType) {
        return new UserMediaValueObject(preference);
    }
}

export { UserMediaValueObject };
