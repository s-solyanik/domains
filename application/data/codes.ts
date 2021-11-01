import {Observable} from "rxjs";

import { Data } from "data/core/data";
import type { FiltersProps, PromotionCodeType } from "domains/test/promotions/entity";

export const CODES_TEMP: PromotionCodeType = {
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

class CodesData extends Data {
    private readonly ids = [0];
    private readonly codes: PromotionCodeType[] = [];

    constructor() {
        super();
        this.codes = this.ids.map((id, index) => ({
            ...CODES_TEMP,
            id: id
        }))
    }

    read(filters: FiltersProps) {
        return new Observable<PromotionCodeType[]>(observer => {
            observer.next(this.codes);
            observer.complete();
        })
    }

    create(value: PromotionCodeType) {
        return new Observable<PromotionCodeType>(observer => {
            const id = this.ids.length + 1;
            this.ids.push(id);

            observer.next({
                ...CODES_TEMP,
                ...value,
                id: id
            });
            observer.complete();
        })
    }

    update(id: number, value: Partial<any>) {
        return new Observable<any>(observer => {
            observer.next({
                ...CODES_TEMP,
                ...value
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