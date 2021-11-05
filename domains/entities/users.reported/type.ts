import type { UserType } from "domains/entities/users";
import type { UserMedia } from "domains/entities/users.media";

export type UserReportedType = {
    id: number
    reason: string
    reportedAt: Date
    data: UserType
    media: UserMedia
}
