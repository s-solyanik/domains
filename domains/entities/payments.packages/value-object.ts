import { ValueObject } from 'domains/core/entity/value-object';
import type { PaymentsPackageType } from 'domains/entities/payments.packages/type';

class PaymentsPackageValueObject extends ValueObject<PaymentsPackageType> {
    static factory(props: PaymentsPackageType) {
        return new PaymentsPackageValueObject(props);
    }
}


export { PaymentsPackageValueObject };
