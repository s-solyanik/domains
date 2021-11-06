import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import { IdentityValueObject } from 'domains/entities/identity.email/value-object';

interface IdentityProps {
    readonly id: IdentifierI
    readonly value: IdentityValueObject
}

class IdentityEntity extends Entity<IdentityProps> {
    private static readonly ms = 1000;
    private static readonly sec = 60;

    //token min ttl 5 min
    private static readonly minDelta = 5;

    public get() {
        return this.props.value.get();
    }

    public expirationMessage() {
        const { exp } = this.get().tokens.access;

        return {
            expiredAt: `Token expired at ${new Date(exp)}`,
            now: `Current time ${new Date()}`
        };
    }

    public isValidAccessToken() {
        const { exp } = this.get().tokens.access;

        //exp in min
        const expMin = Math.floor((exp - Date.now()) / (IdentityEntity.sec * IdentityEntity.ms));

        const isValid = IdentityEntity.minDelta <= expMin;

        if(!isValid) {
            const { expiredAt, now } = this.expirationMessage();
            console.log(expiredAt);
            console.log(now);
        }

        return isValid;
    }

    static id() {
        return IdentityEntity.createId('users.identity.email');
    }

    static factory(access: string, refresh: string, email: string) {
        return new IdentityEntity({
            id: IdentityEntity.id(),
            value: IdentityValueObject.factory(access, refresh, email)
        });
    }
}

export { IdentityEntity };
