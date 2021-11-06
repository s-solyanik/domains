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
import type {UserSocialType} from "domains/entities/users.social";
import {UserSocialEntity} from "domains/entities/users.social";
import type {UserBonusesType} from "domains/entities/users.bonuses";
import {UserBonusesEntity} from "domains/entities/users.bonuses";
import type {UserDevicesType} from "domains/entities/users.devices";
import {UserDevicesEntity} from "domains/entities/users.devices";

export interface UserI {
    data: UserDataType
    location: UserLocationType
    media: UserMediaType
    meta: UserMetaType
    preference: UserPreferenceType
    social: UserSocialType
    installations: UserDevicesType[]
    bonuses: UserBonusesType
}

class User {
    public readonly id: IdentifierI;

    private readonly entities: {
        data: UserDataEntity
        location: UserLocationEntity
        media: UserMediaEntity
        meta: UserMetaEntity
        preference: UserPreferenceEntity
        social: UserSocialEntity
        installations: UserDevicesEntity[]
        bonuses: UserBonusesEntity
    }

    private constructor(user: UserI) {
        this.id = User.id(`${user.data.id}`);
        this.entities = Object.freeze({
            data: UserDataEntity.factory(user.data),
            location: UserLocationEntity.factory(user.location),
            media: UserMediaEntity.factory(user.media),
            meta: UserMetaEntity.factory(user.meta),
            preference: UserPreferenceEntity.factory(user.preference),
            social: UserSocialEntity.factory(user.social),
            installations: user.installations.map(UserDevicesEntity.factory),
            bonuses: UserBonusesEntity.factory(user.bonuses)
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