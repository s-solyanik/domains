export type IdentityType = {
    tokens: {
        access: {
            value: string
            exp: number
        }
        refresh: {
            value: string
            exp: number
        }
    }
    email: string
}
