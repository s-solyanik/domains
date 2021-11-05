import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { UserPurchasesType } from 'domains/entities/users.purchases/type';
import { UserPurchaseValueObject } from 'domains/entities/users.purchases/value-object';

interface PurchaseProps {
    readonly id: IdentifierI
    readonly value: UserPurchaseValueObject
}

class UserPurchasesEntity extends Entity<PurchaseProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return UserPurchasesEntity.createId(`users.purchases.${id}`);
    }

    static factory(props: UserPurchasesType) {
        return new UserPurchasesEntity({
            id: UserPurchasesEntity.id(`${props.id}`),
            value: UserPurchaseValueObject.factory(props)
        });
    }
}

export { UserPurchasesEntity };
