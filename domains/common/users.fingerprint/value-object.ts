import { ValueObject } from 'domains/core/value-object';

import type { FingerprintType } from 'domains/common/users.fingerprint/type';

class UserFingerprintValueObject extends ValueObject<FingerprintType> {
    static factory(user: FingerprintType): UserFingerprintValueObject {
        return new UserFingerprintValueObject(user);
    }
}

export { UserFingerprintValueObject };
