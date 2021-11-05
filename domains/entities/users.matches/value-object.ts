import { ValueObject } from 'domains/core/entity/value-object';
import type { UserMatchesType } from 'domains/entities/users.matches/type';

class UserMatchesValueObject extends ValueObject<UserMatchesType> {
    static factory(preference: UserMatchesType) {
        return new UserMatchesValueObject(preference);
    }
}

export { UserMatchesValueObject };
