import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type {PaymentsOrderType} from "domains/entities/payments.order";
import {PaymentsOrderEntity} from "domains/entities/payments.order";

import {PaymentsOrderData} from "data/web-app/payments/order";

class PaymentsOrderAggregate {
    static shared = singleton(() => new PaymentsOrderAggregate());

    public readonly id: IdentifierI;
    private readonly state: State<PaymentsOrderEntity>;

    private constructor() {
        this.id = PaymentsOrderEntity.id('default');
        this.state = new State<PaymentsOrderEntity>(this.id, this.read, 0);
    }

    private read = () => {
        return PaymentsOrderData.facade.read().pipe(
            switchMap(it => EntityResult.unit(PaymentsOrderEntity.factory, it))
        )
    }

    public create(value: PaymentsOrderType) {
        return PaymentsOrderData.facade.create(value).pipe(
            switchMap(it => EntityResult.unit(PaymentsOrderEntity.factory, it)),
            switchMap(this.state.update)
        )
    }

    public data() {
        return this.state.data().pipe(
            switchMap(it => EntityResult.unitGet<PaymentsOrderEntity, PaymentsOrderType>(it))
        );
    }
}

export type {PaymentsOrderType};
export {PaymentsOrderAggregate};