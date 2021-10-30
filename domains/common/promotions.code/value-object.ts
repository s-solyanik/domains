import { ValueObject } from 'domains/core/value-object';
import { Validation } from 'domains/core/validation';

import type { PromotionCodeType, AlaCateProducts } from 'domains/common/promotions.code/type';

class PromotionCodeValueObject extends ValueObject<PromotionCodeType> {
    static readonly validationRules = {
        promoCode: {
            required: true,
            message: 'This field is required'
        },
        startDate: {
            required: true,
            message: 'This field is required'
        },
        expiration: {
            required: true,
            message: 'This field is required'
        },
        amount: {
            required: true,
            message: 'This field is required'
        },
        adminUserId: {
            required: true,
            message: 'This field is required'
        },
        maxUsers: {
            required: true,
            message: 'This field is required'
        },
        couponType: {
            required: true,
            message: 'This field is required'
        },
        affiliate: {
            required: true,
            message: 'This field is required'
        }
    };

    static alaCarteProducts(): Array<{ title: string; value: AlaCateProducts }> {
        return [
            { value: 'dils', title: 'Bonus Dils' },
            { value: 'notes', title: 'Notes' },
            { value: 'vip', title: 'Vip Subscription' },
            { value: 'vipelite', title: 'Vip Elite Subscription' },
            { value: 'boosts', title: 'Bonus Boots' },
            { value: 'superlikes', title: 'Super Likes' },
            { value: 'readreceipts', title: 'Read Receipts' },
        ];
    }

    public errors() {
        return Validation.factory(PromotionCodeValueObject.validationRules).validate(this.get());
    }

    static factory(code: PromotionCodeType) {
        return new PromotionCodeValueObject(code);
    }
}

export { PromotionCodeValueObject };
