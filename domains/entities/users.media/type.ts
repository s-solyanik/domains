export type ProfilePicture = {
    identifier: string
    createdAt: Date
    moderator?: string
    decision?: string
    displayText?: string
    moderatedAt?: Date
}

export type UserMedia = {
    userId: string
    pictureUrl: string
    imageIdentifiers: string[]
    profilePictures: ProfilePicture[]
    thumbnail: string
}
