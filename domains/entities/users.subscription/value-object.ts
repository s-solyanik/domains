import { ValueObject } from 'domains/core/entity/value-object';
import type { UserSubscription } from 'domains/entities/users.subscription/type';

class UserSubscriptionValueObject extends ValueObject<UserSubscription> {
    static factory(preference: UserSubscription): UserSubscriptionValueObject {
        return new UserSubscriptionValueObject(preference);
    }
}

export { UserSubscriptionValueObject };
