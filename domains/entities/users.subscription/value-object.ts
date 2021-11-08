import { ValueObject } from 'domains/core/entity/value-object';
import type { UserSubscriptionType } from 'domains/entities/users.subscription/type';

class UserSubscriptionValueObject extends ValueObject<UserSubscriptionType> {
    static factory(subscription: UserSubscriptionType) {
        return new UserSubscriptionValueObject(subscription);
    }
}

export { UserSubscriptionValueObject };
