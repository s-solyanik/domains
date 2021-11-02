import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserSubscription } from 'domains/common/users.subscription/type';
import { UserSubscriptionValueObject } from 'domains/common/users.subscription/value-object';

interface UserSubscriptionProps {
    readonly id: IdentifierI
    readonly value: UserSubscriptionValueObject
}

class UserSubscriptionEntity extends Entity<UserSubscriptionProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserSubscriptionEntity.createId(`users.subscription.${id}`);
    }

    static factory(id: string, props: Omit<UserSubscription, 'userId'>) {
        return new UserSubscriptionEntity({
            id: UserSubscriptionEntity.id(id),
            value: UserSubscriptionValueObject.factory({
                userId: id,
                ...props
            })
        });
    }
}

export { UserSubscriptionEntity };
