import type { UserDataType } from "domains/entities/users.data";
import type { UserMediaType } from "domains/entities/users.media";

export type UsersBlockingType = {
    blockedAt: Date
    data: UserDataType
    media: UserMediaType
}
