export type UserBonuses = {
    dils: number
    notes: number
    boosts: number
    superLike: number
    readReceipt: number
    dilsLastRefilled: Date|null
    superLikeExpiration: Date|null
    notesExpiration: Date|null
    boostsExpiration: Date|null
    readReceiptsExpiration: Date|null
}
