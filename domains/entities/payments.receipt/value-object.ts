import { ValueObject } from 'domains/core/entity/value-object';
import type { PaymentsReceiptType } from 'domains/entities/payments.receipt/type';

class PaymentsReceiptValueObject<PaymentMethod> extends ValueObject<Partial<PaymentsReceiptType<PaymentMethod>>> {
    public isValid() {
        return typeof this.get().paymentMethod !== 'undefined';
    }

    static factory<PaymentMethod>(receipt: Partial<PaymentsReceiptType<PaymentMethod>>) {
        return new PaymentsReceiptValueObject(receipt);
    }
}


export { PaymentsReceiptValueObject };
