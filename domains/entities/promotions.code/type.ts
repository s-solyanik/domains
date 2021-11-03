export type AlaCateProducts = 'dils'|'notes'|'vip'|'vipelite'|'boosts'|'superlikes'|'readreceipts';

export type PromotionCodeType = {
    id: number
    promoCode: string
    startDate: Date
    expiration: Date
    amount: number
    adminUserId: number
    maxUsers: number
    couponType: string
    affiliate: string
    description: string
};
