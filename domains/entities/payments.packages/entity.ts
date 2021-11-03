import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { Package, PackageIds } from 'domains/entities/payments.packages/type';
import { PaymentsPackageValueObject } from 'domains/entities/payments.packages/value-object';

interface PaymentsPackagesProps {
    readonly id: IdentifierI
    readonly value: PaymentsPackageValueObject
}

class PaymentsPackages extends Entity<PaymentsPackagesProps>{
    public get() {
        return this.props.value.get().map((value) => value);
    }

    public find(id: PackageIds) {
        return this.props.value.get().find(pkg => pkg.id === id);
    }

    public findAll(...ids: PackageIds[]) {
        if(!ids) {
            return this.get();
        }

        return this.props.value.get().filter(pkg => ids.some(id => pkg.id === id));
    }

    static id() {
        return PaymentsPackages.createId('payments.packages');
    }

    static factory(props?: Package[]) {
        return new PaymentsPackages({
            id: PaymentsPackages.id(),
            value: PaymentsPackageValueObject.factory(props || [])
        });
    }
}

export { PaymentsPackages };
