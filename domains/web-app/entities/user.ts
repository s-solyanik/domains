import {IdentifierI} from "utils/unique-id";
import { UID } from "utils/unique-id";

import { Entity } from "domains/core/entity";
import type { UserDataType } from "domains/entities/users.data";
import { UserDataEntity } from "domains/entities/users.data";
import type { UserLocationType } from "domains/entities/users.location";
import { UserLocationEntity } from "domains/entities/users.location";
import type { UserMediaType } from "domains/entities/users.media";
import { UserMediaEntity } from "domains/entities/users.media";
import type { UserMetaType } from "domains/entities/users.meta";
import { UserMetaEntity } from "domains/entities/users.meta";
import type {UserPreferenceType} from "domains/entities/users.preference";
import {UserPreferenceEntity} from "domains/entities/users.preference";
import type {UserBonusesType} from "domains/entities/users.bonuses";
import {UserBonusesEntity} from "domains/entities/users.bonuses";

export interface UserI {
    data: UserDataType
    meta: UserMetaType
    media: UserMediaType
    location: UserLocationType
    bonuses?: UserBonusesType
    preference?: UserPreferenceType
}

class User {
    public readonly id: IdentifierI;

    private readonly entities: {
        data: UserDataEntity
        meta: UserMetaEntity
        media: UserMediaEntity
        location: UserLocationEntity
        bonuses?: UserBonusesEntity
        preference?: UserPreferenceEntity
    }

    private constructor(user: UserI) {
        this.id = User.id(`${user.data.id}`);
        this.entities = Object.freeze({
            data: UserDataEntity.factory(user.data),
            meta: UserMetaEntity.factory(user.meta),
            media: UserMediaEntity.factory(user.media),
            location: UserLocationEntity.factory(user.location),
            bonuses: user.bonuses ? UserBonusesEntity.factory(user.bonuses) : undefined,
            preference: user.preference ? UserPreferenceEntity.factory(user.preference) : undefined,
        })
    }

    public get() {
        return this.entities;
    }

    static id(id: string) {
        return UID.factory(Entity.name, `users.${id}`)
    }

    static factory(user: UserI) {
        return new User(user);
    }
}

export { User };