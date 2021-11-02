import { ValueObject } from 'domains/core/entity/value-object';
import type { IdentityType } from 'domains/common/identity.common/type';

class IdentityValueObject extends ValueObject<IdentityType> {
    static factory(tokens: IdentityType): IdentityValueObject {
        return new IdentityValueObject(tokens);
    }
}


export { IdentityValueObject };
