import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserPreference, UserDefaultPreferences } from 'domains/common/users.preference/type';
import { UserPreferenceValueObject } from 'domains/common/users.preference/value-object';

interface UserPreferenceProps {
    readonly id: IdentifierI
    readonly value: UserPreferenceValueObject
}

class UserPreferenceEntity extends Entity<UserPreferenceProps> {
    public update(value: Partial<Omit<UserPreference, 'userId'>>) {
        const { userId, ...rest } = this.get();

        return UserPreferenceEntity.factory(userId, {
            ...rest,
            ...value
        });
    }

    public get() {
        return this.props.value.get();
    }

    static getDefaultPreference(): UserDefaultPreferences {
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

    static factory(id: string, props: Omit<UserPreference, 'userId'>) {
        return new UserPreferenceEntity({
            id: UserPreferenceEntity.id(id),
            value: UserPreferenceValueObject.factory({
                userId: id,
                ...props
            })
        });
    }
}

export { UserPreferenceEntity };
