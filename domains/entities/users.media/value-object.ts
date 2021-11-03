import { ValueObject } from 'domains/core/entity/value-object';
import type { UserMedia } from 'domains/entities/users.media/type';

class UserMediaValueObject extends ValueObject<UserMedia> {
    static factory(preference: UserMedia): UserMediaValueObject {
        return new UserMediaValueObject(preference);
    }
}

export { UserMediaValueObject };
