export type PackageIds = 'co.dilmil.vip.elite.w.1mo'
| 'co.dilmil.vip.elite.w.life'
| 'co.dilmil.vip.elite.w.3mo'
| 'co.dilmil.vip.elite.w.1wk'
| 'co.dilmil.vip.elite.w.12mo'
| 'co.dilmil.vip.elite.w.life.discount.60'
| 'co.dilmil.vip.elite.w.3mo.discount.30'
| 'co.dilmil.vip.elite.w.12mo.trial.2wk'
| 'co.dilmil.vip.elite.w.12mo.discount.30.trial.2wk'
| 'co.dilmil.vip.elite.w.12mo.discount.30'
| 'co.dilmil.vip.elite.w.12mo.30plus.discount.30'
| 'co.dilmil.vip.elite.w.12mo.discount.50'
| 'co.dilmil.vip.elite.w.12mo.30plus.discount.50'
| 'co.dilmil.vip.elite.w.12mo.discount.30.trial.1wk'
| 'co.dilmil.vip.elite.w.12mo.30plus.discount.30.trial.1wk'
| 'co.dilmil.vip.elite.w.12mo.discount.50.trial.1wk'
| 'co.dilmil.vip.elite.w.12mo.30plus.discount.50.trial.1wk'
| 'co.dilmil.vip.elite.w.12mo.30plus.discount.30.trial.2wk'
| 'co.dilmil.vip.elite.w.12mo.discount.50.trial.2wk'
| 'co.dilmil.vip.elite.w.12mo.30plus.discount.50.trial.2wk'
| 'co.dilmil.vip.elite.w.3mo.trial.1wk'
| 'co.dilmil.vip.elite.w.3mo.discount.20'
| 'co.dilmil.vip.elite.w.3mo.30plus.discount.20';

export type Package = {
    id: PackageIds
    name: string
    price: number
    currency: string
    pricePerPeriod?: number
    discount?: number
    perPeriod?: string
    discountText?: string
    offerDescription?: string
    fullPrice?: number
    tag?: string
}
