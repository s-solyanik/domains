import { ValueObject } from 'domains/core/entity/value-object';
import type { UserType } from 'domains/entities/users/type';

class UserValueObject extends ValueObject<UserType> {
    static factory(user: UserType): UserValueObject {
        return new UserValueObject(user);
    }
}

export { UserValueObject };
