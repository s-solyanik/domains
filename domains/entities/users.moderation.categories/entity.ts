import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { ModerationCategoriesType } from "domains/entities/users.moderation.categories/type";
import { ModerationCategoriesValueObject } from 'domains/entities/users.moderation.categories/value-object';

interface ModerationCategoriesProps {
    readonly id: IdentifierI
    readonly value: ModerationCategoriesValueObject
}

class ModerationCategoriesEntity extends Entity<ModerationCategoriesProps> {
    public get() {
        return this.props.value.get();
    }

    static id() {
        return ModerationCategoriesEntity.createId('users.moderation.categories');
    }

    static factory(props: ModerationCategoriesType) {
        return new ModerationCategoriesEntity({
            id: ModerationCategoriesEntity.id(),
            value: ModerationCategoriesValueObject.factory(props)
        });
    }
}

export { ModerationCategoriesEntity };
