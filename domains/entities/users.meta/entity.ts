import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserMeta } from 'domains/entities/users.meta/type';
import { UserMetaValueObject, TEST_PHONE_NUMBERS } from 'domains/entities/users.meta/value-object';

interface UserMetaProps {
    readonly id: IdentifierI
    readonly value: UserMetaValueObject
}

class UserMetaEntity extends Entity<UserMetaProps> {
    private readonly mandatoryFields: Array<Partial<keyof UserMeta>> = [
        'email'
    ];

    public update(value: Partial<Omit<UserMeta, 'userId'>>) {
        const { userId, ...rest } = this.get();
        return UserMetaEntity.factory(userId, {
            ...rest,
            ...value
        });
    }

    public hide() {
        const { userId, ...rest } = this.get();
        return UserMetaEntity.factory(userId, {
            ...rest,
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

    static factory(id: string, props: Omit<UserMeta, 'userId'>) {
        return new UserMetaEntity({
            id: UserMetaEntity.id(id),
            value: UserMetaValueObject.factory({
                userId: id,
                ...props
            })
        });
    }
}

export { UserMetaEntity };
