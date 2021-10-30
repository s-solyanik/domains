import {Observable} from "rxjs";

import { Data } from "data/core/data";
import type { FiltersProps, PromotionCodeType } from "domains/test/promotions/codes";

const code: PromotionCodeType = {
    id: 0,
    promoCode: 'CODE',
    startDate: new Date(),
    expiration: new Date(),
    amount: 123,
    adminUserId: 10000,
    maxUsers: 134,
    couponType: 'coupon-type',
    affiliate: 'affiliate',
    description: 'description'
};

const CODES = [code].map(code => ({
    ...code,
    id: Math.floor(Math.random() * 100)
}))

class CodesData extends Data {
    read(filters: FiltersProps) {
        return new Observable<PromotionCodeType[]>(observer => {
            observer.next(CODES);
            observer.complete();
        })
    }

    create(value: PromotionCodeType) {
        return new Observable<PromotionCodeType>(observer => {
            observer.next({
                ...code,
                ...value,
                id: Math.floor(Math.random() * 100)
            });
            observer.complete();
        })
    }

    update(id: number, value: Partial<any>) {
        return new Observable<any>(observer => {
            observer.next({
                ...code,
                ...value,
                id: Math.floor(Math.random() * 100)
            });
            observer.complete();
        })
    }

    delete(id: number) {
        return new Observable<any>(observer => {
            observer.next(true);
            observer.complete();
        })
    }

    static get facade() {
        return new CodesData();
    }
}

export {CodesData }