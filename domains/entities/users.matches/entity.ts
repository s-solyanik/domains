import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserMatches } from 'domains/entities/users.matches/type';
import { UserMatchesValueObject } from 'domains/entities/users.matches/value-object';

interface UserMatchesProps {
    readonly id: IdentifierI
    readonly value: UserMatchesValueObject
}

class UserMatchesEntity extends Entity<UserMatchesProps> {
    public update(value: Partial<Omit<UserMatches, 'userId'>>) {
        const { userId, ...rest } = this.get();
        return UserMatchesEntity.factory(userId, {
            ...rest,
            ...value
        });
    }

    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserMatchesEntity.createId(`users.matches.${id}`);
    }

    static factory(id: string, props: Omit<UserMatches, 'userId'>) {
        return new UserMatchesEntity({
            id: UserMatchesEntity.id(id),
            value: UserMatchesValueObject.factory({
                userId: id,
                ...props
            })
        });
    }
}

export { UserMatchesEntity };
