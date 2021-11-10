import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { PaymentsPackageType } from 'domains/entities/payments.packages/type';
import { PaymentsPackageValueObject } from 'domains/entities/payments.packages/value-object';

interface PaymentsPackageProps {
    readonly id: IdentifierI
    readonly value: PaymentsPackageValueObject
}

class PaymentsPackageEntity extends Entity<PaymentsPackageProps>{
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return PaymentsPackageEntity.createId(`payments.packages.${id}`);
    }

    static factory(props: PaymentsPackageType) {
        return new PaymentsPackageEntity({
            id: PaymentsPackageEntity.id(`${props.id}`),
            value: PaymentsPackageValueObject.factory(props)
        });
    }
}

export { PaymentsPackageEntity };
