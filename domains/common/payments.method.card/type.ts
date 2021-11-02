export enum CARDS_IDS {
    VISA = 'visa',
    MASTERCARD = 'mastercard',
    AMERICAN_EXPRESS = 'american-express',
    DINERS_CLUB = 'diners-club',
    DISCOVER = 'discover',
    JCB = 'jcb',
    UNIONPAY = 'unionpay',
    MAESTRO = 'maestro',
    ELO = 'elo',
    MIR = 'mir',
    HIPER = 'hiper',
    HIPERCARD = 'hipercard',
}

export type CreditCard = {
    card: number
    cvv: string
    name: string
    date: string
    strict?: boolean
}

export type CreditCardType = {
    niceType: string
    type: string
    patterns: Array<number[] | number>
    gaps: number[]
    lengths: number[]
    code: {
        size: number
        name: string
    }
    matchStrength?: number
};
