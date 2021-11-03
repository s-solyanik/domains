import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { AdsType } from 'domains/common/promotions/type';
import { AdsValueObject } from 'domains/common/promotions/value-object';

interface AdsProps {
    readonly id: IdentifierI
    readonly value: AdsValueObject
}

class AdsEntity extends Entity<AdsProps>{
    public get() {
        return this.props.value.get();
    }

    public update(props: Partial<AdsType>) {
        const entity = AdsEntity.factory({
            ...this.props.value.get(),
            ...props
        });

        if(entity.props.value.errors().length) {
            return entity.props.value.errors();
        }

        return entity;
    }

    static id(id: number|string) {
        return AdsEntity.createId(`promotion.ads.${id}`);
    }

    static factory(props: AdsType) {
        return new AdsEntity({
            id: AdsEntity.id(props.id),
            value: AdsValueObject.factory(props)
        });
    }
}

export { AdsEntity };
