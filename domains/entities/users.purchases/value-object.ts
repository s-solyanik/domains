import { ValueObject } from 'domains/core/entity/value-object';
import type { UserPurchasesType } from 'domains/entities/users.purchases/type';

class UserPurchaseValueObject extends ValueObject<UserPurchasesType> {
    static factory(purchases: UserPurchasesType) {
        return new UserPurchaseValueObject(purchases);
    }
}

export { UserPurchaseValueObject };
