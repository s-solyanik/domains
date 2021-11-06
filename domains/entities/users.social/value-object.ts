import { ValueObject } from 'domains/core/entity/value-object';
import type { UserSocialType } from 'domains/entities/users.social/type';

class UserSocialValueObject extends ValueObject<UserSocialType> {
    static factory(social: UserSocialType) {
        return new UserSocialValueObject(social);
    }
}

export { UserSocialValueObject };
