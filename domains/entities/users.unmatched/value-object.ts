import { ValueObject } from 'domains/core/entity/value-object';
import type { UserUnmatched } from 'domains/entities/users.unmatched/type';

class UserUnmatchedValueObject extends ValueObject<UserUnmatched> {
    static factory(preference: UserUnmatched): UserUnmatchedValueObject {
        return new UserUnmatchedValueObject(preference);
    }
}

export { UserUnmatchedValueObject };
