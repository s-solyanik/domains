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

export interface UserI {
    data: UserDataType
    location: UserLocationType
    media: UserMediaType
    meta: UserMetaType
}

class User {
    private readonly id: IdentifierI;

    private readonly entities: {
        data: UserDataEntity
        location: UserLocationEntity
        media: UserMediaEntity
        meta: UserMetaEntity
    }

    constructor(user: UserI) {
        this.id = User.id(`${user.data.id}`);
        this.entities = Object.freeze({
            data: UserDataEntity.factory(user.data),
            location: UserLocationEntity.factory(user.location),
            media: UserMediaEntity.factory(user.media),
            meta: UserMetaEntity.factory(user.meta),
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