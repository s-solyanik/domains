import { switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import type { EntityArrayI } from "domains/core/entity/array-with-state";
import { EntityArrayWithState, SORT } from "domains/core/entity/array-with-state";

import type { PromotionCodeType } from "domains/entities/promotions.code";
import { PromotionCodeEntity } from "domains/entities/promotions.code";

import { CodesData } from "data/codes";

type FiltersProps = {
    page: number
    pagesize: number
    orderby: 'desc'|'id'|'id.desc'
    couponType: string
}

class PromotionCodesAggregate implements EntityArrayI<PromotionCodeEntity, PromotionCodeType> {
    static shared = singleton((filters: FiltersProps) => {
        return new EntityArrayWithState<PromotionCodeEntity, PromotionCodeType>(new PromotionCodesAggregate(filters));
    })

    public readonly ttl = 300;
    public readonly sort = SORT.ASC;

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;

    constructor(filters: FiltersProps) {
        this.id = PromotionCodeEntity.id('list');
        this.filters = filters;
    }

    public unitId(id: number) {
        return PromotionCodeEntity.id(`${id}`);
    }

    public read = () => {
        return CodesData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(PromotionCodeEntity.factory, it))
        )
    }

    public create(value: PromotionCodeType) {
        return CodesData.facade.create(value).pipe(
            switchMap(it => EntityResult.unit(PromotionCodeEntity.factory, it))
        )
    }

    public update(id: number, value: Partial<PromotionCodeType>) {
        return CodesData.facade.update(id, value).pipe(
            switchMap(it => EntityResult.unit(PromotionCodeEntity.factory, it))
        )
    }

    public delete(id: number) {
        return CodesData.facade.delete(id).pipe(
            switchMap(EntityResult.errorOrSuccess)
        )
    }
}

export type { PromotionCodeType, FiltersProps };
export { PromotionCodesAggregate };