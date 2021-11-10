import {of, Observable, EMPTY} from 'rxjs';
import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result, FAILURE_MESSAGE} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type { PaymentsMethodCardType, PaymentsCreditCardType } from "domains/entities/payments.method.card";
import {PaymentsMethodCardEntity} from "domains/entities/payments.method.card";

type Verification = {
    isValid: boolean
    isPotentiallyValid: boolean
}

class PaymentsMethodCardAggregate {
    static shared = singleton(() => new PaymentsMethodCardAggregate());

    public readonly id: IdentifierI;
    private readonly state: State<PaymentsMethodCardEntity>;

    private constructor() {
        this.id = PaymentsMethodCardEntity.id();
        this.state = new State<PaymentsMethodCardEntity>(this.id, this.read, 0);
    }

    private read = () => {
        return EMPTY;
    }

    public create(card: Partial<PaymentsCreditCardType>) {
        this.state.update(Result.success(PaymentsMethodCardEntity.factory(card)));
    }

    public number(number?: number) {
        return new Observable<Result<Verification & { card: PaymentsMethodCardType|null }, FAILURE_MESSAGE>>(observer => {
            (async () => {
                try {
                    const response = await PaymentsMethodCardEntity.factory({ card: number }).number();
                    observer.next(Result.success(response));
                } catch (error) {
                    observer.next(Result.failure(error));
                }

                observer.complete();
            })();
        });
    }

    public cvv(number?: number, cvv?: string) {
        return new Observable<Result<Verification, FAILURE_MESSAGE>>(observer => {
            (async () => {
                try {
                    const response = await PaymentsMethodCardEntity.factory({ card: number, cvv }).cvv();
                    observer.next(Result.success(response));
                } catch (error) {
                    observer.next(Result.failure(error));
                }

                observer.complete();
            })();
        });
    }

    public date(date?: string) {
        return new Observable<Result<Verification, FAILURE_MESSAGE>>(observer => {
            (async () => {
                try {
                    const response = await PaymentsMethodCardEntity.factory({ date: date }).date();
                    observer.next(Result.success(response));
                } catch (error) {
                    observer.next(Result.failure(error));
                }

                observer.complete();
            })();
        });
    }

    public name(name?: string) {
        return new Observable<Result<Verification, FAILURE_MESSAGE>>(observer => {
            (async () => {
                try {
                    const response = await PaymentsMethodCardEntity.factory({ name: name }).name();
                    observer.next(Result.success(response));
                } catch (error) {
                    observer.next(Result.failure(error));
                }

                observer.complete();
            })();
        });
    }

    public validate() {
        return this.state.origin().pipe(
            switchMap(it => {
                return new Observable<Result<PaymentsCreditCardType, FAILURE_MESSAGE>>(observer => {
                    (async () => {
                        if(it.isSuccessful) {
                            try {
                                observer.next(
                                    Result.success(
                                        await it.value.validate()
                                    )
                                );
                            } catch (error) {
                                observer.next(Result.failure(error as FAILURE_MESSAGE));
                            }
                        } else {
                            observer.next(Result.failure({
                                status: 400,
                                message: 'Unknown error'
                            }));
                        }

                        observer.complete();
                    })();
                });
            })
        );

    }

    public tokenize() {
        return this.validate().pipe(
            switchMap(it => {
                if(!it.isSuccessful) {
                    return of(
                        Result.failure(it.error)
                    );
                }

                return of(Result.success(it.value));
            })
        );
    }

    public data() {
        return this.state.data().pipe(
            switchMap(it => EntityResult.unitGet<PaymentsMethodCardEntity, PaymentsMethodCardType>(it))
        );
    }
}

export type {PaymentsMethodCardType};
export {PaymentsMethodCardAggregate};