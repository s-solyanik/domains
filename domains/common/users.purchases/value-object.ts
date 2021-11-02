import { ValueObject } from 'domains/core/entity/value-object';
import type { Purchase } from 'domains/common/users.purchases/type';

class PurchaseValueObject extends ValueObject<Purchase> {
    static factory(preference: Purchase): PurchaseValueObject {
        return new PurchaseValueObject(preference);
    }
}

export { PurchaseValueObject };
