import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserMatchesType } from 'domains/entities/users.matches/type';
import { UserMatchesValueObject } from 'domains/entities/users.matches/value-object';

interface UserMatchesProps {
    readonly id: IdentifierI
    readonly value: UserMatchesValueObject
}

class UserMatchesEntity extends Entity<UserMatchesProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserMatchesEntity.createId(`users.matches.${id}`);
    }

    static factory(props: UserMatchesType) {
        return new UserMatchesEntity({
            id: UserMatchesEntity.id(`${props.id}`),
            value: UserMatchesValueObject.factory(props)
        });
    }
}

export { UserMatchesEntity };
