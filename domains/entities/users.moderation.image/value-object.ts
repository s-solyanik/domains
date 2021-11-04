import { ValueObject } from 'domains/core/entity/value-object';
import type { ModerationImageType } from 'domains/entities/users.moderation.image/type';

class UserModerationImageImageValueObject extends ValueObject<ModerationImageType> {
    static factory(ModerationImage: ModerationImageType): UserModerationImageImageValueObject {
        return new UserModerationImageImageValueObject(ModerationImage);
    }
}

export { UserModerationImageImageValueObject };
