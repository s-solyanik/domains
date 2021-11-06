import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserSocialType } from 'domains/entities/users.social/type';
import { UserSocialValueObject } from 'domains/entities/users.social/value-object';

interface UserSocialProps {
    readonly id: IdentifierI
    readonly value: UserSocialValueObject
}

class UserSocialEntity extends Entity<UserSocialProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserSocialEntity.createId(`users.social.${id}`);
    }

    static factory(props: UserSocialType) {
        return new UserSocialEntity({
            id: UserSocialEntity.id(`${props.id}`),
            value: UserSocialValueObject.factory(props)
        });
    }
}

export { UserSocialEntity };
