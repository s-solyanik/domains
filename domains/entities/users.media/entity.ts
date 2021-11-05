import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserMediaType } from 'domains/entities/users.media/type';
import { UserMediaValueObject } from 'domains/entities/users.media/value-object';

interface UserMediaProps {
    readonly id: IdentifierI
    readonly value: UserMediaValueObject
}

class UserMediaEntity extends Entity<UserMediaProps> {
    private readonly mandatoryFields: Array<Partial<keyof UserMediaType>> = [
        'pictureUrl'
    ];

    public get() {
        return this.props.value.get();
    }

    public hasMandatory() {
        return this.mandatoryFields.every(key => Boolean(this.get()[key]));
    }

    static id(id: string) {
        return UserMediaEntity.createId(`users.media.${id}`);
    }

    static factory(props: UserMediaType) {
        return new UserMediaEntity({
            id: UserMediaEntity.id(`${props.id}`),
            value: UserMediaValueObject.factory(props)
        });
    }
}

export { UserMediaEntity };
