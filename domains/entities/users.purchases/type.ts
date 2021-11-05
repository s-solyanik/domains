export type UserPurchasesType = {
    id: number
    createdAt: Date
    profileId: number
    method: string
    price: number
    productId: string
    type: string
    status: string
    sandbox: boolean
    timesCharged: number
    subscriptionActive: boolean
    startedAsTrial: boolean
    purchaseType: string
    methodPurchaseId: string
    lifeId: number
    expiration?: Date
    expirationChecked?: Date
    updatedAt?: Date
    purchasedAt?: Date
}
