import { v4 } from 'uuid';

import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { PaymentsReceiptType } from 'domains/entities/payments.receipt/type';
import { PaymentsReceiptValueObject } from 'domains/entities/payments.receipt/value-object';

interface PaymentsReceiptProps<PaymentMethod> {
    readonly id: IdentifierI
    readonly value: PaymentsReceiptValueObject<PaymentMethod>
}

class PaymentsReceiptEntity<PaymentMethod> extends Entity<PaymentsReceiptProps<PaymentMethod>> {
    public get() {
        if(!this.props.value.isValid()) {
            throw new Error('Payment method is undefined');
        }

        return this.props.value.get() as PaymentsReceiptType<PaymentMethod>;
    }

    public update(paymentMethod: PaymentMethod) {
        return PaymentsReceiptEntity.factory(
            {
                ...this.props.value.get(),
                paymentMethod: paymentMethod
            },
            this.id
        );
    }

    static id() {
        return PaymentsReceiptEntity.createId(`payments.receipt.${v4()}`);
    }

    static factory<PaymentMethod>(props: Partial<PaymentsReceiptType<PaymentMethod>>, id?: IdentifierI) {
        const receiptId = id ? id : PaymentsReceiptEntity.id();

        return new PaymentsReceiptEntity({
            id: receiptId,
            value: PaymentsReceiptValueObject.factory(props)
        });
    }
}

export { PaymentsReceiptEntity };
