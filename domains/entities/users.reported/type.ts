import type { UserDataType } from "domains/entities/users.data";
import type { UserMediaType } from "domains/entities/users.media";

export type UserReportedType = {
    id: number
    reason: string
    reportedAt: Date
    data: UserDataType
    media: UserMediaType
}
