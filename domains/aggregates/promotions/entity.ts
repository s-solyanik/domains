import { map, switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";

import { EntityResult } from "domains/core/entity/result";
import type { EntityArrayI } from "domains/core/entity/array-with-state";
import { SORT } from "domains/core/entity/array-with-state";

import type { PromotionCodeType } from "domains/common/promotions.code";
import { PromotionCodeEntity } from "domains/common/promotions.code";

import { CodesData } from "data/codes";
import {Result} from "utils/result/dto";

type FiltersProps = {
    page: number
    pagesize: number
    orderby: 'desc'|'id'|'id.desc'
    couponType: string
}

class PromotionCodesEntity implements EntityArrayI<PromotionCodeEntity, PromotionCodeType> {
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
            switchMap(it => EntityResult.createArray(PromotionCodeEntity.factory, it))
        )
    }

    public create(value: PromotionCodeType) {
        return CodesData.facade.create(value).pipe(
            switchMap(it => EntityResult.create(PromotionCodeEntity.factory, it))
        )
    }

    public update(id: number, value: Partial<PromotionCodeType>) {
        return CodesData.facade.update(id, value).pipe(
            switchMap(it => EntityResult.create(PromotionCodeEntity.factory, it))
        )
    }

    public delete(id: number) {
        return CodesData.facade.delete(id).pipe(
            switchMap(EntityResult.errorOrSuccess)
        )
    }
}

export type { PromotionCodeType, FiltersProps };
export { PromotionCodesEntity };