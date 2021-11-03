import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserMedia } from 'domains/entities/users.media/type';
import { UserMediaValueObject } from 'domains/entities/users.media/value-object';

interface UserMediaProps {
    readonly id: IdentifierI
    readonly value: UserMediaValueObject
}

class UserMediaEntity extends Entity<UserMediaProps> {
    private readonly mandatoryFields: Array<Partial<keyof UserMedia>> = [
        'pictureUrl'
    ];

    public update(value: Partial<Omit<UserMedia, 'userId'>>) {
        const { userId, ...rest } = this.get();
        return UserMediaEntity.factory(userId, {
            ...rest,
            ...value
        });
    }

    public get() {
        return this.props.value.get();
    }

    public hasMandatory() {
        return this.mandatoryFields.every(key => Boolean(this.get()[key]));
    }

    static id(id: string) {
        return UserMediaEntity.createId(`users.media.${id}`);
    }

    static factory(id: string, props: Omit<UserMedia, 'userId'>) {
        return new UserMediaEntity({
            id: UserMediaEntity.id(id),
            value: UserMediaValueObject.factory({
                userId: id,
                ...props
            })
        });
    }
}

export { UserMediaEntity };
