import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { IdentityPhoneType } from 'domains/entities/identity.common/type';
import { IdentityValueObject } from 'domains/entities/identity.common/value-object';

interface IdentityProps {
    readonly id: IdentifierI
    readonly value: IdentityValueObject
}

class IdentityPhoneEntity extends Entity<IdentityProps> {
    public get() {
        return this.props.value.get();
    }

    static id() {
        return IdentityPhoneEntity.createId('users.identity.phone');
    }

    static factory(props: IdentityPhoneType) {
        return new IdentityPhoneEntity({
            id: IdentityPhoneEntity.id(),
            value: IdentityValueObject.factory(props)
        });
    }
}

export { IdentityPhoneEntity };
