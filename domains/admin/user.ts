import type { UserType } from "domains/entities/users";
import { UserEntity } from "domains/entities/users";
import type { UserLocationType } from "domains/entities/users.location";
import { UserLocationEntity } from "domains/entities/users.location";
import type { UserMediaType } from "domains/entities/users.media";
import { UserMediaEntity } from "domains/entities/users.media";
import type { UserMetaType } from "domains/entities/users.meta";
import { UserMetaEntity } from "domains/entities/users.meta";

interface UserI {
    data: UserType
    location: UserLocationType
    media: UserMediaType
    meta: UserMetaType
}

class User {
    private readonly entities: {
        data: UserEntity
        location: UserLocationEntity
        media: UserMediaEntity
        meta: UserMetaEntity
    }

    constructor(user: UserI) {
        this.entities = Object.freeze({
            data: UserEntity.factory(user.data),
            location: UserLocationEntity.factory(user.location),
            media: UserMediaEntity.factory(user.media),
            meta: UserMetaEntity.factory(user.meta),
        })
    }
}

export { User };