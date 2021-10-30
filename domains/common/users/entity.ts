import type { IdentifierI } from 'utils/unique-id';
import { UID } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserType } from 'domains/common/users/type';
import { UserValueObject } from 'domains/common/users/value-object';

interface UserProps {
    readonly id: IdentifierI
    readonly value: UserValueObject
}

class UserEntity extends Entity<UserProps> {
    private readonly mandatoryFields: Array<Partial<keyof UserType>> = [
        'firstName',
        'gender',
        'birthday'
    ];

    public get() {
        return this.value.get();
    }

    public update(value: Partial<UserType>) {
        return UserEntity.factory({
            ...this.get(),
            ...value
        });
    }

    public hasMandatory() {
        return this.mandatoryFields.every(key => Boolean(this.get()[key]));
    }

    static id(id: string) {
        return UID.factory(UserEntity.idName, `users.${id}`);
    }

    static factory(props: UserType) {
        return new UserEntity({
            id: UserEntity.id(props.identifier),
            value: UserValueObject.factory(props)
        });
    }
}

export { UserEntity };
