import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import { UserUnmatchedValueObject } from 'domains/entities/users.unmatched/value-object';
import type { UserUnmatched } from 'domains/entities/users.unmatched/type';

interface UserUnmatchedProps {
    readonly id: IdentifierI
    readonly value: UserUnmatchedValueObject
}

class UserUnmatchedEntity extends Entity<UserUnmatchedProps> {
    public update(value: Partial< Omit<UserUnmatched, 'userId'>>) {
        const { userId, ...rest } = this.get();
        return UserUnmatchedEntity.factory(userId, {
            ...rest,
            ...value
        });
    }

    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserUnmatchedEntity.createId(`users.unmatched.${id}`);
    }

    static factory(id: string, props: Omit<UserUnmatched, 'userId'>) {
        return new UserUnmatchedEntity({
            id: UserUnmatchedEntity.id(id),
            value: UserUnmatchedValueObject.factory({
                userId: id,
                ...props
            })
        });
    }
}

export { UserUnmatchedEntity };
