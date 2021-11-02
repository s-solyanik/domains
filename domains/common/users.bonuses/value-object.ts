import { ValueObject } from 'domains/core/entity/value-object';
import type { UserBonuses } from 'domains/common/users.bonuses/type';

class UserBonusesValueObject extends ValueObject<UserBonuses> {
    static factory(preference: UserBonuses): UserBonusesValueObject {
        return new UserBonusesValueObject(preference);
    }
}

export { UserBonusesValueObject };
