import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import { UserUnmatchedValueObject } from 'domains/entities/users.unmatched/value-object';
import type { UserUnmatchedType } from 'domains/entities/users.unmatched/type';

interface UserUnmatchedProps {
    readonly id: IdentifierI
    readonly value: UserUnmatchedValueObject
}

class UserUnmatchedEntity extends Entity<UserUnmatchedProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserUnmatchedEntity.createId(`users.unmatched.${id}`);
    }

    static factory(props: UserUnmatchedType) {
        return new UserUnmatchedEntity({
            id: UserUnmatchedEntity.id(`${props.id}`),
            value: UserUnmatchedValueObject.factory(props)
        });
    }
}

export { UserUnmatchedEntity };
