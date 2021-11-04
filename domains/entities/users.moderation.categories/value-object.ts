import { ValueObject } from 'domains/core/entity/value-object';
import type { ModerationCategoriesType } from 'domains/entities/users.moderation.categories/type';

class ModerationCategoriesValueObject extends ValueObject<ModerationCategoriesType> {
    static factory(moderation: ModerationCategoriesType): ModerationCategoriesValueObject {
        return new ModerationCategoriesValueObject(moderation);
    }
}

export { ModerationCategoriesValueObject };
