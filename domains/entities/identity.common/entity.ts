import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { IdentityType } from 'domains/entities/identity.common/type';
import { IdentityValueObject } from 'domains/entities/identity.common/value-object';

interface IdentityProps {
    readonly id: IdentifierI
    readonly value: IdentityValueObject
}

class Identity extends Entity<IdentityProps> {
    public get() {
        return this.props.value.get();
    }

    static id() {
        return Identity.createId('users.identity.entities');
    }

    static factory(props: IdentityType) {
        return new Identity({
            id: Identity.id(),
            value: IdentityValueObject.factory(props)
        });
    }
}

export { Identity };
