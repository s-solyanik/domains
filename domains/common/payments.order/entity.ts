import { v4 } from 'uuid';

import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { PaymentsOrderType } from 'domains/common/payments.order/type';
import { PaymentsOrderValueObject } from 'domains/common/payments.order/value-object';

interface PaymentsOrderProps {
    readonly id: IdentifierI
    readonly value: PaymentsOrderValueObject
}

class PaymentsOrderEntity extends Entity<PaymentsOrderProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return PaymentsOrderEntity.createId(`payments.order.${id}`);
    }

    static factory(props: PaymentsOrderType) {
        const orderId = v4();

        return new PaymentsOrderEntity({
            id: PaymentsOrderEntity.id(orderId),
            value: PaymentsOrderValueObject.factory({
                ...props,
                id: orderId
            })
        });
    }
}

export { PaymentsOrderEntity };
