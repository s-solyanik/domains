import { ValueObject } from 'domains/core/entity/value-object';
import type { UserMetaType } from 'domains/entities/users.meta/type';

const TEST_PHONE_NUMBERS: string[] = [
    '14243714614',
    '19167986675',
    '14243714612',
    '14243714613',
    '14845559411',
    '19167986625',
    '14243714611',
    '19167771115',
    '15103711857',
    '17148667276',
    '4845559411',
    '9167986675',
    '9167986625',
    '9167771115',
    '5103711857',
    '4243714612',
    '7148667276'
];

class UserMetaValueObject extends ValueObject<UserMetaType> {
    static getReview() {
        return [
            'Visible',
            'Suspended',
            'Hidden',
            'Banned',
            'Pending',
            'Appeal',
            'New'
        ];
    }

    static factory(preference: UserMetaType) {
        return new UserMetaValueObject(preference);
    }
}

export { UserMetaValueObject, TEST_PHONE_NUMBERS };
