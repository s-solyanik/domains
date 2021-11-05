import { ValueObject } from 'domains/core/entity/value-object';
import type { UserUnmatchedType } from 'domains/entities/users.unmatched/type';

class UserUnmatchedValueObject extends ValueObject<UserUnmatchedType> {
    static factory(preference: UserUnmatchedType) {
        return new UserUnmatchedValueObject(preference);
    }
}

export { UserUnmatchedValueObject };
