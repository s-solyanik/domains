import {EMPTY, Observable, of, zip} from "rxjs";
import {switchMap, take, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result, FailureResult, FAILURE_MESSAGE} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type {PaymentsExchangeType} from "domains/entities/payments.exchnage";
import {PaymentsExchangeEntity} from "domains/entities/payments.exchnage";

import type {ReceiptBaseInput} from "domains/web-app/aggregates/checkout/receipts/base";
import {PaymentsMethodCardAggregate} from "domains/web-app/aggregates/checkout/credit-card";
import {PaymentsReceiptMotoAggregate} from "domains/web-app/aggregates/checkout/receipts/moto";
import {PaymentsOrderAggregate} from "domains/web-app/aggregates/checkout/order";

import {PaymentsExchangeData} from "data/web-app/payments/exchange";

type CheckoutAggregateType = Omit<ReceiptBaseInput, 'forMe'> & {
    type: string|null
}

class PaymentsExchangeAggregate {
    static shared = singleton(() => new PaymentsExchangeAggregate());

    public readonly id: IdentifierI;
    private readonly state: State<PaymentsExchangeEntity>;

    private constructor() {
        this.id = PaymentsExchangeEntity.id();
        this.state = new State<PaymentsExchangeEntity>(this.id, () => EMPTY, 0);
    }

    private creditCard(creditCardMethod: PaymentsMethodCardAggregate) {
        return zip(
            this.data(),
            creditCardMethod.tokenize(),
        ).pipe(
            take(1),
            switchMap((it: any[]) => {
                const [base, creditCard] = it;

                if(!base.isSuccessful || !creditCard.isSuccessful) {
                    const error = base.error || creditCard.error || {};

                    return of(Result.failure({
                        status: 0,
                        message: 'Error. Reload a page and try again.',
                        ...error,
                    }));
                }
                PaymentsReceiptMotoAggregate.shared().create(base.value, creditCard.value);
                return PaymentsReceiptMotoAggregate.shared().data();
            })
        ).pipe(
            switchMap(it => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error));
                }

                try {
                    const receiptProps = it.value;
                    const { beneficiaryName, beneficiaryEmail } = receiptProps;

                    return PaymentsExchangeData.facade.create(receiptProps).pipe(
                        switchMap((it) => {
                            if(!it.isSuccessful) {
                                return of(Result.failure(it.error));
                            }

                            //TODO add 3ds action handler

                            const exchange = PaymentsExchangeEntity.factory(it.value);
                            const order = PaymentsOrderAggregate.shared();

                            order.create({
                                claimCode: it.value.claimCode,
                                beneficiaryName: beneficiaryName,
                                beneficiaryEmail: beneficiaryEmail,
                            });

                            return order.data().pipe(
                                map(it => {
                                    return Result.success({
                                        ...exchange.get(),
                                        id: it.value.id
                                    });
                                })
                            );
                        })
                    );
                } catch (error) {
                    return of(Result.failure({
                        status: 0,
                        message: error.message
                    }));
                }
            })
        );
    }

    public create(value: ReceiptBaseInput) {
        return PaymentsExchangeData.facade.create(value).pipe(
            switchMap(it => EntityResult.unit(PaymentsExchangeEntity.factory, it)),
            switchMap(this.state.update)
        )
    }

    public exchange(method: any) {
        if(PaymentsMethodCardAggregate.id().equals(method.id)) {
            return this.creditCard(method as PaymentsMethodCardAggregate);
        }

        return new Observable<FailureResult<FAILURE_MESSAGE>>((observer) => {
            observer.next(Result.failure({
                status: 0,
                message: 'Payment Method is not supported '
            }));
            observer.complete();
        });
    }

    public data() {
        return this.state.data().pipe(
            switchMap(it => EntityResult.unitGet<PaymentsExchangeEntity, PaymentsExchangeType>(it))
        );
    }
}

export type {PaymentsExchangeType, CheckoutAggregateType};
export {PaymentsExchangeAggregate};