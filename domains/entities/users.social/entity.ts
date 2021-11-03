import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserSocial } from 'domains/entities/users.social/type';
import { UserSocialValueObject } from 'domains/entities/users.social/value-object';

interface UserSocialProps {
    readonly id: IdentifierI
    readonly value: UserSocialValueObject
}

class UserSocialEntity extends Entity<UserSocialProps> {
    public update(value: Partial<Omit<UserSocial, 'userId'>>) {
        const { userId, ...rest } = this.get();
        return UserSocialEntity.factory(userId, {
            ...rest,
            ...value
        });
    }

    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserSocialEntity.createId(`users.social.${id}`);
    }

    static factory(id: string, props: Omit<UserSocial, 'userId'>) {
        return new UserSocialEntity({
            id: UserSocialEntity.id(id),
            value: UserSocialValueObject.factory({
                userId: id,
                ...props
            })
        });
    }
}

export { UserSocialEntity };
