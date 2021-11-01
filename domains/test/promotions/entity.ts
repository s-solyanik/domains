import { map } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";

import type { EntityArrayI } from "domains/core/entity/array-with-state";
import { SORT } from "domains/core/entity/array-with-state";

import type { PromotionCodeType } from "domains/common/promotions.code";
import { PromotionCodeEntity } from "domains/common/promotions.code";

import { CodesData } from "data/codes";

type FiltersProps = {
    page: number
    pagesize: number
    orderby: 'desc'|'id'|'id.desc'
    couponType: string
}

class PromotionCodesEntity implements EntityArrayI<PromotionCodeType> {
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
            map(it => it.map(PromotionCodeEntity.factory))
        )
    }

    public create(value: PromotionCodeType) {
        return CodesData.facade.create(value).pipe(
            map((it) => PromotionCodeEntity.factory(it)),
        )
    }

    public update(id: number, value: Partial<PromotionCodeType>) {
        return CodesData.facade.update(id, value).pipe(
            map((it) => PromotionCodeEntity.factory(it)),
        )
    }

    public delete(id: number) {
        return CodesData.facade.delete(id).pipe(
            map(() => true)
        )
    }
}

export type { PromotionCodeType, FiltersProps };
export { PromotionCodesEntity };