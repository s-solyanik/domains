export type UserSocial = {
    userId: string
    facebookId: string
    facebookToken: string | null
    facebookLikes: string[] | null
    facebookVerified: boolean
    facebookFriends: number[] | null
    facebookUserName: string | null
    instagramLinks: string[]
    instagramName: string | null
    instagramToken: string | null
    linkedin: string | null
    linkedinAccessToken: string | null
}
