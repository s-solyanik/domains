import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserSubscriptionType } from 'domains/entities/users.subscription/type';
import { UserSubscriptionValueObject } from 'domains/entities/users.subscription/value-object';

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

    static factory(props: UserSubscriptionType) {
        return new UserSubscriptionEntity({
            id: UserSubscriptionEntity.id(`${props.id}`),
            value: UserSubscriptionValueObject.factory(props)
        });
    }
}

export { UserSubscriptionEntity };
