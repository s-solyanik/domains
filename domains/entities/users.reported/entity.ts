import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserReportedType } from 'domains/entities/users.reported/type';
import { UserReportedValueObject } from 'domains/entities/users.reported/value-object';

interface UserReportedProps {
    readonly id: IdentifierI
    readonly value: UserReportedValueObject
}

class UserReportedEntity extends Entity<UserReportedProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserReportedEntity.createId(`users.reported.${id}`);
    }

    static factory(props: UserReportedType) {
        return new UserReportedEntity({
            id: UserReportedEntity.id(`${props.data.id}`),
            value: UserReportedValueObject.factory(props)
        });
    }
}

export { UserReportedEntity };
