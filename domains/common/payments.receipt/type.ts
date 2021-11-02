export type PaymentsReceiptType<T> = {
    forMe: boolean
    client: 'web_01'
    product: string
    paymentMethod: T
    beneficiaryEmail: string|null
    beneficiaryName: string|null
    user: string|null
    guid: string|null
}
