import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { PaymentsCreditCardType } from 'domains/entities/payments.method.card/type';
import { PaymentsMethodCardValueObject } from 'domains/entities/payments.method.card/value-object';

interface PaymentsMethodCardProps {
    readonly id: IdentifierI
    readonly value: PaymentsMethodCardValueObject
}

class PaymentsMethodCardEntity extends Entity<PaymentsMethodCardProps> {
    public get() {
        return this.props.value.get();
    }

    public number() {
        return this.props.value.number();
    }

    public cvv() {
        return this.props.value.cvv();
    }

    public date() {
        return this.props.value.date();
    }

    public name() {
        return this.props.value.name();
    }

    public validate() {
        return this.props.value.validate();
    }

    static id() {
        return PaymentsMethodCardEntity.createId('payments.method.card');
    }

    static factory(creditCard: Partial<PaymentsCreditCardType>) {
        return new PaymentsMethodCardEntity({
            id: PaymentsMethodCardEntity.id(),
            value: PaymentsMethodCardValueObject.factory(creditCard)
        });
    }
}

export { PaymentsMethodCardEntity };
