export type UserPreference = {
    userId: string
    prefGender: string
    prefMaxAge: number
    prefMinAge: number
    prefMinHeight: number
    prefMaxHeight: number
    prefReligion: string[]
    prefRaisedIn: string[]
    prefOccupation: string[]
    prefCommunity: string[]
    prefEducation: string[]
    searchLocation: Array<{
        city: string|null
        country: string|null
        current: boolean
        displayName: string
        latitude: number
        longitude: number
        selected: boolean
        state: string|null
    }>
}

export type UserDefaultPreferences = {
    community: string[]
    education: string[]
    gender: string[]
    occupation: string[]
    raisedIn: string[]
    religion: string[]
}

