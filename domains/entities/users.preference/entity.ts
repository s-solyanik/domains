import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserPreferenceType, UserDefaultPreferencesType } from 'domains/entities/users.preference/type';
import { UserPreferenceValueObject } from 'domains/entities/users.preference/value-object';

interface UserPreferenceProps {
    readonly id: IdentifierI
    readonly value: UserPreferenceValueObject
}

class UserPreferenceEntity extends Entity<UserPreferenceProps> {
    public get() {
        return this.props.value.get();
    }

    static getDefaultPreference(): UserDefaultPreferencesType {
        return {
            community: UserPreferenceValueObject.community,
            education: UserPreferenceValueObject.education,
            gender: UserPreferenceValueObject.gender,
            occupation: UserPreferenceValueObject.occupation,
            raisedIn: UserPreferenceValueObject.raisedIn,
            religion: UserPreferenceValueObject.religion
        };
    }

    static id(id: string) {
        return UserPreferenceEntity.createId(`users.preference.${id}`);
    }

    static factory(props: UserPreferenceType) {
        return new UserPreferenceEntity({
            id: UserPreferenceEntity.id(`${props.id}`),
            value: UserPreferenceValueObject.factory(props)
        });
    }
}

export { UserPreferenceEntity };
