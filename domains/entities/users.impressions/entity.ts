import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserImpressionType } from 'domains/entities/users.impressions/type';
import { UserImpressionValueObject } from 'domains/entities/users.impressions/value-object';

interface ImpressionProps {
    readonly id: IdentifierI
    readonly value: UserImpressionValueObject
}

class UserImpressionEntity extends Entity<ImpressionProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserImpressionEntity.createId(`users.impressions.${id}`);
    }

    static factory(props: UserImpressionType) {
        return new UserImpressionEntity({
            id: UserImpressionEntity.id(props.date.toJSON()),
            value: UserImpressionValueObject.factory(props)
        });
    }
}

export { UserImpressionEntity };
