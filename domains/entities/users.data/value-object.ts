import { ValueObject } from 'domains/core/entity/value-object';
import type { UserDataType } from 'domains/entities/users.data/type';

class UserValueObject extends ValueObject<UserDataType> {
    static factory(user: UserDataType): UserValueObject {
        return new UserValueObject(user);
    }
}

export { UserValueObject };
