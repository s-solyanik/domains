export enum SUBSCRIPTION_STATE {
    DISPUTED = 'disputed',
    UNCLAIMED = 'unclaimed',
    EXPIRED = 'expired',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
    ONGOING = 'ongoing',
}

export type UserSubscriptionType = {
    id: number
    caption: string
    state: SUBSCRIPTION_STATE
}
