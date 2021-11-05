export type ProfilePicture = {
    identifier: string
    createdAt: Date
    moderator?: string
    decision?: string
    displayText?: string
    moderatedAt?: Date
}

export type UserMediaType = {
    id: number
    pictureUrl: string
    imageIdentifiers: string[]
    profilePictures: ProfilePicture[]
    thumbnail: string
}
