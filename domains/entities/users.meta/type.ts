export type ImageVerification = {
    identifier: string
    createdAt: Date
    decision?: string
    moderator?: string
    reason?: string
    moderatedAt?: Date
}

export type DilDetails = {
    identifier: string
    header: string
    description: string
}

export type ProfilePrompts = {
    identifier: string
    header: string
    description: string
}

export type AnalyticsLink = {
    name: string
    src: string
}

export type UserMetaType = {
    id: number
    community: string
    education: string
    occupation: string
    profileInterests: string[]|null
    religion: string
    subscriptions: string[]
    subscriptionsDate: Date|null
    raisedIn: string
    phoneNumber: string
    verificationStatus: 'notStarted'|'pending'|'approved'|'declined'
    notes: string
    review: string
    verificationPictures: ImageVerification[]
    educationInfo?: string[] | null
    occupationInfo?: string[] | null
    profileTitle?: string
    updatedAt?: Date
    createAt?: Date
    email?: string
    isDeleted: boolean
    details: DilDetails[]
    prompts: ProfilePrompts[]
    analyticsLinks: AnalyticsLink[]
}
