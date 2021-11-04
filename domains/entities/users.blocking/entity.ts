import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UsersBlockingType } from 'domains/entities/users.blocking/type';
import { UsersBlockingValueObject } from 'domains/entities/users.blocking/value-object';

interface UsersBlockingProps {
    readonly id: IdentifierI
    readonly value: UsersBlockingValueObject
}

class UsersBlockingEntity extends Entity<UsersBlockingProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UsersBlockingEntity.createId(`users.blocking.${id}`);
    }

    static factory(props: UsersBlockingType) {
        return new UsersBlockingEntity({
            id: UsersBlockingEntity.id(`${props.data.id}`),
            value: UsersBlockingValueObject.factory(props)
        });
    }
}

export { UsersBlockingEntity };
