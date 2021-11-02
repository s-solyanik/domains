import { ValueObject } from 'domains/core/entity/value-object';
import type { Package } from 'domains/common/payments.packages/type';

class PaymentsPackageValueObject extends ValueObject<Package[]> {
    static factory(props: Package[]): PaymentsPackageValueObject {
        return new PaymentsPackageValueObject(props);
    }
}


export { PaymentsPackageValueObject };
