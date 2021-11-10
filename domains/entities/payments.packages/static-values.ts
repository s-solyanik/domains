import type { PaymentsPackageType } from 'domains/entities/payments.packages/type';

export const PACKAGES: PaymentsPackageType[] = [
    {
        'id':'co.dilmil.vip.elite.w.1mo',
        'name':'1 Month',
        'price': 34.99,
        'pricePerPeriod': 34.99,
        'currency':'$',
        'perPeriod':'mo',
        'discountText':''
    },
    {
        'id':'co.dilmil.vip.elite.w.life',
        'name':'Lifetime',
        'price':449.99,
        'currency':'$',
        'discountText':'No subscription'
    },
    {
        'id':'co.dilmil.vip.elite.w.3mo',
        'name': '3 months',
        'price': 69.99,
        'pricePerPeriod': 23.33,
        'currency':'$',
        'perPeriod':'mo',
        'discountText':'Save 37%',
        'tag':'Most popular'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo',
        'name':'12 months',
        'price': 199.99,
        'pricePerPeriod': 16.67,
        'currency':'$',
        'perPeriod':'mo',
        'discountText':'Save 57%'
    },
    {
        'id':'co.dilmil.vip.elite.w.1wk',
        'name':'Weekly',
        'price':11.99,
        'currency':'$',
        'perPeriod':'wk'
    },
    {
        'id':'co.dilmil.vip.elite.w.life.discount.60',
        'name':'Lifetime',
        'price':179.99,
        'fullPrice':449.99,
        'discount': 60,
        'currency':'$',
        'discountText':'60% off',
        'tag':'Limited time offer'
    },
    {
        'id':'co.dilmil.vip.elite.w.3mo.discount.30',
        'name':'3 Months',
        'price':49.99,
        'fullPrice':69.99,
        'discount': 30,
        'currency':'$',
        'discountText':'30% off',
        'tag':'Limited time offer'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.trial.2wk',
        'name':'12 Months',
        'price':199.99,
        'currency':'$',
        'tag':'Limited time offer',
        'offerDescription':'2 Weeks Free'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.discount.30.trial.2wk',
        'name':'12 Months',
        'price':139.99,
        'discount': 30,
        'currency':'$',
        'discountText':'30% off',
        'tag':'Limited time offer',
        'offerDescription':'2 Weeks Free'
    },

    {
        'id':'co.dilmil.vip.elite.w.12mo.discount.30',
        'name':'12 Months',
        'price':139.99,
        'discount': 30,
        'currency':'$',
        'discountText':'30% off',
        'tag':'Limited time offer'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.30plus.discount.30',
        'name':'12 Months',
        'price':174.99,
        'discount': 30,
        'currency':'$',
        'discountText':'30% off',
        'tag':'Limited time offer'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.discount.50',
        'name':'12 Months',
        'price':99.99,
        'discount': 50,
        'currency':'$',
        'discountText':'50% off',
        'tag':'Limited time offer'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.30plus.discount.50',
        'name':'12 Months',
        'price':124.99,
        'discount': 50,
        'currency':'$',
        'discountText':'50% off',
        'tag':'Limited time offer'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.discount.30.trial.1wk',
        'name':'12 Months',
        'price':139.99,
        'discount': 30,
        'currency':'$',
        'discountText':'30% off',
        'tag':'Limited time offer',
        'offerDescription':'1 Week Free'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.30plus.discount.30.trial.1wk',
        'name':'12 Months',
        'price':174.99,
        'discount': 30,
        'currency':'$',
        'discountText':'30% off',
        'tag':'Limited time offer',
        'offerDescription':'1 Week Free'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.discount.50.trial.1wk',
        'name':'12 Months',
        'price':99.99,
        'discount': 50,
        'currency':'$',
        'discountText':'50% off',
        'tag':'Limited time offer',
        'offerDescription':'1 Week Free'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.30plus.discount.50.trial.1wk',
        'name':'12 Months',
        'price':124.99,
        'discount': 50,
        'currency':'$',
        'discountText':'50% off',
        'tag':'Limited time offer',
        'offerDescription':'1 Week Free'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.30plus.discount.30.trial.2wk',
        'name':'12 Months',
        'price':174.99,
        'discount': 30,
        'currency':'$',
        'discountText':'30% off',
        'tag':'Limited time offer',
        'offerDescription':'2 Weeks Free'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.discount.50.trial.2wk',
        'name':'12 Months',
        'price':99.99,
        'discount': 50,
        'currency':'$',
        'discountText':'50% off',
        'tag':'Limited time offer',
        'offerDescription':'2 Weeks Free'
    },
    {
        'id':'co.dilmil.vip.elite.w.12mo.30plus.discount.50.trial.2wk',
        'name':'12 Months',
        'price':124.99,
        'discount': 50,
        'currency':'$',
        'discountText':'50% off',
        'tag':'Limited time offer',
        'offerDescription':'2 Weeks Free'
    },
    {
        'id': 'co.dilmil.vip.elite.w.3mo.trial.1wk',
        'name':'3 Months',
        'price': 69.99,
        'currency':'$',
        'discountText':'',
        'tag':'Limited time offer',
        'offerDescription':'1 Week Free Trial'
    },
    {
        'id': 'co.dilmil.vip.elite.w.3mo.discount.20',
        'name':'3 Months',
        'price': 54.99,
        'currency':'$',
        'discount': 20,
        'discountText':'20% off',
        'tag':'Limited time offer',
        'offerDescription': undefined
    },
    {
        'id': 'co.dilmil.vip.elite.w.3mo.30plus.discount.20',
        'name':'3 Months',
        'price': 79.99,
        'discount': 20,
        'currency':'$',
        'discountText':'20% off',
        'tag':'Limited time offer',
        'offerDescription': undefined
    }
];
