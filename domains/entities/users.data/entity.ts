import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserDataType } from 'domains/entities/users.data/type';
import { UserValueObject } from 'domains/entities/users.data/value-object';

interface UserProps {
    readonly id: IdentifierI
    readonly value: UserValueObject
}

class UserDataEntity extends Entity<UserProps> {
    private readonly mandatoryFields: Array<Partial<keyof UserDataType>> = [
        'firstName',
        'gender',
        'birthday'
    ];

    public get() {
        return this.props.value.get();
    }

    public update(value: Partial<UserDataType>) {
        return UserDataEntity.factory({
            ...this.get(),
            ...value
        });
    }

    public hasMandatory() {
        return this.mandatoryFields.every(key => Boolean(this.get()[key]));
    }

    static id(id: string) {
        return Entity.createId(`users.data.${id}`);
    }

    static factory(props: UserDataType) {
        return new UserDataEntity({
            id: UserDataEntity.id(props.identifier),
            value: UserValueObject.factory(props)
        });
    }
}

export { UserDataEntity };
