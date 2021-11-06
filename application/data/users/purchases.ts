import {Observable} from "rxjs";

import { Data } from "application/data/core/data";

import type { FiltersProps, UserPurchasesType } from "domains/admin/aggregates/users/purchases";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

const Value:UserPurchasesType = {
    createdAt: new Date("2021-10-21 14:18:52 +0000"),
    expiration: new Date("2021-10-21 14:18:52 +0000"),
    expirationChecked: new Date("2021-10-21 14:18:52 +0000"),
    id: 1379288,
    lifeId: 1296160,
    method: "apple",
    methodPurchaseId: "460000922155181",
    price: 79.99,
    productId: "co.dilmil.vip.elite.k.3mo",
    profileId: 1296160,
    purchaseType: "firstpurchase",
    purchasedAt: new Date("2021-10-21 14:18:52 +0000"),
    sandbox: false,
    startedAsTrial: false,
    status: "EXPIRED",
    subscriptionActive: false,
    timesCharged: 1,
    type: "subscription",
    updatedAt: new Date("2021-10-21 14:18:52 +0000")
}

class UserPurchasesData extends Data {
    read(filters: FiltersProps) {
        return new Observable<Result<{ items: UserPurchasesType[], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [Value],
                total: 1
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new UserPurchasesData();
    }
}

export { UserPurchasesData }