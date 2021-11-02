import { ValueObject } from 'domains/core/entity/value-object';
import type { PaymentsExchangeType } from 'domains/common/payments.exchnage/type';

class PaymentsExchangeValueObject extends ValueObject<PaymentsExchangeType> {
    static factory(exchange: PaymentsExchangeType): PaymentsExchangeValueObject {
        return new PaymentsExchangeValueObject(exchange);
    }
}


export { PaymentsExchangeValueObject };
