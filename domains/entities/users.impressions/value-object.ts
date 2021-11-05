import { ValueObject } from 'domains/core/entity/value-object';
import type { UserImpressionType } from 'domains/entities/users.impressions/type';

class UserImpressionValueObject extends ValueObject<UserImpressionType> {
    static factory(impression: UserImpressionType) {
        return new UserImpressionValueObject(impression);
    }
}

export { UserImpressionValueObject };
