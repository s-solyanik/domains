import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserMetaType } from 'domains/entities/users.meta/type';
import { UserMetaValueObject, TEST_PHONE_NUMBERS } from 'domains/entities/users.meta/value-object';

interface UserMetaProps {
    readonly id: IdentifierI
    readonly value: UserMetaValueObject
}

class UserMetaEntity extends Entity<UserMetaProps> {
    private readonly mandatoryFields: Array<Partial<keyof UserMetaType>> = [
        'email'
    ];

    public hide() {
        return UserMetaEntity.factory({
            ...this.get(),
            review: 'Hidden'
        });
    }

    public get() {
        return this.props.value.get();
    }

    public isTestAccount() {
        return TEST_PHONE_NUMBERS.some((phone) => phone === this.get()?.phoneNumber?.replace('+', ''));
    }

    public hasMandatory() {
        return this.mandatoryFields.every(key => Boolean(this.get()[key]));
    }

    static getReview() {
        return UserMetaValueObject.getReview();
    }

    static id(id: string) {
        return UserMetaEntity.createId(`users.meta.${id}`);
    }

    static factory(props: UserMetaType) {
        return new UserMetaEntity({
            id: UserMetaEntity.id(`${props.id}`),
            value: UserMetaValueObject.factory(props)
        });
    }
}

export { UserMetaEntity };
