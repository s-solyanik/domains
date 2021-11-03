import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { Purchase } from 'domains/entities/users.purchases/type';
import { PurchaseValueObject } from 'domains/entities/users.purchases/value-object';

interface PurchaseProps {
    readonly id: IdentifierI
    readonly value: PurchaseValueObject
}

class PurchaseEntity extends Entity<PurchaseProps> {
    public update(value: Partial<Omit<Purchase, 'userId'>>) {
        const { userId, ...rest } = this.get();
        return PurchaseEntity.factory(userId, {
            ...rest,
            ...value
        });
    }

    public get() {
        return this.props.value.get();
    }

    static id(id: string) {
        return PurchaseEntity.createId(`users.purchases.${id}`);
    }

    static factory(id: string, props: Omit<Purchase, 'userId'>) {
        return new PurchaseEntity({
            id: PurchaseEntity.id(id),
            value: PurchaseValueObject.factory({
                userId: id,
                ...props
            })
        });
    }
}

export { PurchaseEntity };
