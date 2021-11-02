export type UserUnmatched = {
    userId: string
    id: number
    createdAt: Date
    action: string
    reason: string
    note: string
    interestProfile: {
        firstName: string
        lastName?: string
        id: number
        url: URL
    }
}
