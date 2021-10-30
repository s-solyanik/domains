export type UserType = {
    identifier: string
    age: number
    about: string
    gender: 'male'|'female'|'other'
    height: number
    firstName: string
    id: number | null
    lastName?: string
    birthday?: Date
}
