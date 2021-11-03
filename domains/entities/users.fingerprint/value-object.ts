import { ValueObject } from 'domains/core/entity/value-object';

import type { FingerprintType } from 'domains/entities/users.fingerprint/type';

class UserFingerprintValueObject extends ValueObject<FingerprintType> {
    static factory(user: FingerprintType): UserFingerprintValueObject {
        return new UserFingerprintValueObject(user);
    }
}

export { UserFingerprintValueObject };
