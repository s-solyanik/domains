import { ValueObject } from 'domains/core/entity/value-object';
import type { UserBonusesType } from 'domains/entities/users.bonuses/type';

class UserBonusesValueObject extends ValueObject<UserBonusesType> {
    static factory(bonuses: UserBonusesType) {
        return new UserBonusesValueObject(bonuses);
    }
}

export { UserBonusesValueObject };
