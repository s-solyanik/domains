import { ValueObject } from 'domains/core/entity/value-object';
import type { UserReportedType } from 'domains/entities/users.reported/type';

class UserReportedValueObject extends ValueObject<UserReportedType> {
    static factory(blocking: UserReportedType): UserReportedValueObject {
        return new UserReportedValueObject(blocking);
    }
}

export { UserReportedValueObject };
