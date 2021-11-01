import {Observable} from "rxjs";

import { Data } from "data/core/data";
import type { FiltersProps, PromotionCodeType } from "domains/test/promotions/entity";
import {singleton} from "utils/singleton";

export const CODES_TEMP: PromotionCodeType = {
    id: 0,
    promoCode: '0',
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
    static shared = singleton(() => new CodesData());

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
            this.ids.push(this.ids.length);

            observer.next({
                ...CODES_TEMP,
                ...value,
                id: this.ids.length - 1
            });
            observer.complete();
        })
    }

    update(id: number, value: Partial<any>) {
        return new Observable<PromotionCodeType>(observer => {
            observer.next({
                ...CODES_TEMP,
                ...value
            });
            observer.complete();
        })
    }

    delete(id: number) {
        return new Observable<boolean>(observer => {
            observer.next(true);
            observer.complete();
        })
    }

    static get facade() {
        return CodesData.shared();
    }
}

export {CodesData }