import type { UserType } from "domains/entities/users";
import type { UserMediaType } from "domains/entities/users.media";

export type UsersBlockingType = {
    blockedAt: Date
    data: UserType
    media: UserMediaType
}
