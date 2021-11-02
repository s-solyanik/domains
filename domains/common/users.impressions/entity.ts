import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { Impression } from 'domains/common/users.impressions/type';
import { ImpressionValueObject } from 'domains/common/users.impressions/value-object';

interface ImpressionProps {
    readonly id: IdentifierI
    readonly value: ImpressionValueObject
}

class ImpressionEntity extends Entity<ImpressionProps> {
    public update(value: Partial<Omit<Impression, 'userId'>>) {
        const { userId, ...rest } = this.get();
        return ImpressionEntity.factory(userId, {
            ...rest,
            ...value
        });
    }

    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return ImpressionEntity.createId(`users.impressions.${id}`);
    }

    static factory(id: string, props: Omit<Impression, 'userId'>) {
        return new ImpressionEntity({
            id: ImpressionEntity.id(id),
            value: ImpressionValueObject.factory({
                userId: id,
                ...props
            })
        });
    }
}

export { ImpressionEntity };
