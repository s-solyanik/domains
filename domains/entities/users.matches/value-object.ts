import { ValueObject } from 'domains/core/entity/value-object';
import type { UserMatches } from 'domains/entities/users.matches/type';

class UserMatchesValueObject extends ValueObject<UserMatches> {
    static factory(preference: UserMatches): UserMatchesValueObject {
        return new UserMatchesValueObject(preference);
    }
}

export { UserMatchesValueObject };
