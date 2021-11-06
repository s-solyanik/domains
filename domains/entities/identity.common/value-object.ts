import { ValueObject } from 'domains/core/entity/value-object';
import type { IdentityPhoneType } from 'domains/entities/identity.common/type';

class IdentityValueObject extends ValueObject<IdentityPhoneType> {
    static factory(tokens: IdentityPhoneType) {
        return new IdentityValueObject(tokens);
    }
}


export { IdentityValueObject };
