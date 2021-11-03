import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { PromotionCodeType } from 'domains/entities/promotions.code/type';
import { PromotionCodeValueObject } from 'domains/entities/promotions.code/value-object';

interface PromotionCodeProps {
    readonly id: IdentifierI
    readonly value: PromotionCodeValueObject
}

class PromotionCodeEntity extends Entity<PromotionCodeProps> {
    public get() {
        return this.props.value.get();
    }

    public errors() {
        return this.props.value.errors();
    }

    static getAlaCateProducts() {
        return PromotionCodeValueObject.alaCarteProducts();
    }

    public update(props: Partial<PromotionCodeType>) {
        const entity = PromotionCodeEntity.factory({
            ...this.props.value.get(),
            ...props
        });

        if(entity.errors().length) {
            return entity.errors();
        }

        return entity;
    }

    static id(id: string) {
        return Entity.createId(`promotions.codes.${id}`);
    }

    static factory(props: PromotionCodeType) {
        return new PromotionCodeEntity({
            id: PromotionCodeEntity.id(`${props.id}`),
            value: PromotionCodeValueObject.factory(props)
        });
    }
}

export { PromotionCodeEntity };
