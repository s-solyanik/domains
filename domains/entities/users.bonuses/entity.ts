import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserBonusesType } from 'domains/entities/users.bonuses/type';
import { UserBonusesValueObject } from 'domains/entities/users.bonuses/value-object';

interface UserBonusesProps {
    readonly id: IdentifierI
    readonly value: UserBonusesValueObject
}

class UserBonusesEntity extends Entity<UserBonusesProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserBonusesEntity.createId(`users.bonuses.${id}`);
    }

    static factory(props: UserBonusesType) {
        return new UserBonusesEntity({
            id: UserBonusesEntity.id(`${props.id}`),
            value: UserBonusesValueObject.factory(props)
        });
    }
}

export { UserBonusesEntity };
