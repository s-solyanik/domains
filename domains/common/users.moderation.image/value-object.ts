import { ValueObject } from 'domains/core/entity/value-object';
import type { Moderation } from 'domains/common/users.moderation.image/type';

class UserModerationImageValueObject extends ValueObject<Moderation> {
    static factory(moderation: Moderation): UserModerationImageValueObject {
        return new UserModerationImageValueObject(moderation);
    }
}

export { UserModerationImageValueObject };
