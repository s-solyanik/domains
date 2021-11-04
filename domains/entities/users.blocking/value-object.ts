import { ValueObject } from 'domains/core/entity/value-object';
import type { UsersBlockingType } from 'domains/entities/users.blocking/type';

class UsersBlockingValueObject extends ValueObject<UsersBlockingType> {
    static factory(blocking: UsersBlockingType): UsersBlockingValueObject {
        return new UsersBlockingValueObject(blocking);
    }
}

export { UsersBlockingValueObject };
