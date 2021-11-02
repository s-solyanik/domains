import { ValueObject } from 'domains/core/entity/value-object';
import type { UserSocial } from 'domains/common/users.social/type';

class UserSocialValueObject extends ValueObject<UserSocial> {
    static factory(preference: UserSocial): UserSocialValueObject {
        return new UserSocialValueObject(preference);
    }
}

export { UserSocialValueObject };
