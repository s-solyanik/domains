export type PaymentsExchangeType = {
    state: 'needAction'|'completed'|'rejected'
    action?: {
        pareq: string
        ascurl: string
        termUrl: string
        md: string
    }
}
