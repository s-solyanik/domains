export type UserMatches = {
    userId: string
    id: number
    uuid: string
    createdAt: Date
    matchAlgo: string
    hasMessages: boolean
    matchProfile: {
        firstName: string
        lastName?: string
        id: number
        url: URL
    }
    updatedAt?: Date
}
