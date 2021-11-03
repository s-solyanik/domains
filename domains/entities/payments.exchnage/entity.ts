import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { PaymentsExchangeType } from 'domains/entities/payments.exchnage/type';
import { PaymentsExchangeValueObject } from 'domains/entities/payments.exchnage/value-object';

interface PaymentsExchangeProps {
    readonly id: IdentifierI
    readonly value: PaymentsExchangeValueObject
}

class PaymentsExchange extends Entity<PaymentsExchangeProps> {
    public get() {
        return this.props.value.get();
    }

    static id() {
        return PaymentsExchange.createId('payments.exchange');
    }

    static factory(props: PaymentsExchangeType) {
        return new PaymentsExchange({
            id: PaymentsExchange.id(),
            value: PaymentsExchangeValueObject.factory(props)
        });
    }
}

export { PaymentsExchange };
