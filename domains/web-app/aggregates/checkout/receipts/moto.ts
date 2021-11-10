import {EMPTY, zip, of} from "rxjs";
import {switchMap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type {PaymentsReceiptType} from "domains/entities/payments.receipt";
import {PaymentsReceiptEntity} from "domains/entities/payments.receipt";
import type {PaymentsCreditCardType} from "domains/entities/payments.method.card";

import type {PaymentsBaseReceiptAggregate} from "domains/web-app/aggregates/checkout/receipts/base";

import {DeviceData} from "data/web-app/env/device-info";

type BillingAddress = {
    addressLine: string
    city: string
    state: string
    country: string
    zip: string
}

type ReceiptMotoDeviceInfo = {
    deviceType: 'browser'
    browserData: {
        locale: string
        userAgent: string
        javaEnabled: boolean
        javaScriptEnabled: boolean
        colorDepth: number
        height: number
        width: number
        challengeWindowSize: number
        timezoneOffsetUtcMinutes: number
    }
}

type ReceiptMotoMethod = {
    deviceInfo: ReceiptMotoDeviceInfo
    cardNumber: string
    cvv: string
    cardHolder: string
    expiration: string
    billingAddress?: Partial<BillingAddress>
}

class PaymentsReceiptMotoAggregate {
    static shared = singleton(() => new PaymentsReceiptMotoAggregate());

    public readonly id: IdentifierI;
    private readonly state: State<PaymentsReceiptEntity<ReceiptMotoMethod>>;

    private constructor() {
        this.id = PaymentsReceiptEntity.id();
        this.state = new State<PaymentsReceiptEntity<ReceiptMotoMethod>>(this.id, this.read, 0);
    }

    private read = () => {
        return EMPTY;
    }

    public create(receipt: PaymentsBaseReceiptAggregate, creditCard: PaymentsCreditCardType) {
        return receipt.data().pipe(
            switchMap(it => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error));
                }

                const baseReceipt = it.value;

                return zip(
                    of(undefined),
                    //UserAggregate.shared().get(),
                    DeviceData.facade.read(),
                ).pipe(
                    map(it => {
                        return Result.failure({
                            status: 500,
                            message: 'error'
                        })
                    }),
                    // map((it) => {
                    //     const [ user, device ] = it;
                    //
                    //     if(!user.isSuccessful) {
                    //         return Result.failure(user.error);
                    //     }
                    //
                    //     const location = user.value?.location;
                    //     const receiptEntity = PaymentsReceiptEntity.factory<ReceiptMotoMethod>({
                    //         ...baseReceipt,
                    //         paymentMethod: {
                    //             deviceInfo: device.value,
                    //             cvv: `${creditCard.cvv}`,
                    //             cardHolder: creditCard.name,
                    //             expiration: creditCard.date,
                    //             cardNumber: `${creditCard.card}`,
                    //             billingAddress: location ? {
                    //                 addressLine: location.address || undefined,
                    //                 city: location.city || undefined,
                    //                 state: location.state || undefined,
                    //                 country: location.country || undefined,
                    //                 zip: undefined
                    //             } : undefined,
                    //         }
                    //     });
                    //
                    //     return Result.success(receiptEntity);
                    // })
                );
            })
        )
    }

    public data() {
        return this.state.data().pipe(
            switchMap(it => {
                return EntityResult.unitGet<PaymentsReceiptEntity<ReceiptMotoMethod>, PaymentsReceiptType<ReceiptMotoMethod>>(it)
            })
        );
    }
}

export type {PaymentsReceiptType};
export {PaymentsReceiptMotoAggregate};