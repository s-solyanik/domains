import { switchMap } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import type { EntityArrayI } from "domains/core/entity/array-with-state";
import { EntityArrayWithState, SORT } from "domains/core/entity/array-with-state";

import type { AdsType } from "domains/entities/promotions";
import { AdsEntity } from "domains/entities/promotions";

import { AdsData } from "data/ads";

type FiltersProps = {
    orderby?: 'desc'|'id'|'startDate.desc,id'
    page?: number
    pagesize?: number
    trackads?: 0|1
    country?: string
    gender?: string
    isSecureGet?: boolean
}

class PromotionAdsAggregate implements EntityArrayI<AdsEntity, AdsType> {
    static shared = singleton((filters: FiltersProps) => {
        return new EntityArrayWithState<AdsEntity, AdsType>(new PromotionAdsAggregate(filters));
    })

    public readonly ttl = 300;
    public readonly sort = SORT.ASC;

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;

    constructor(filters: FiltersProps) {
        this.id = AdsEntity.id('list');
        this.filters = filters;
    }

    public unitId(id: number) {
        return AdsEntity.id(`${id}`);
    }

    public read = () => {
        return AdsData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(AdsEntity.factory, it))
        )
    }

    public create(value: AdsType) {
        return AdsData.facade.create(value).pipe(
            switchMap(it => EntityResult.unit(AdsEntity.factory, it))
        )
    }

    public update(id: number, value: Partial<AdsType>) {
        return AdsData.facade.update(id, value).pipe(
            switchMap(it => EntityResult.unit(AdsEntity.factory, it))
        )
    }

    public delete(id: number) {
        return AdsData.facade.delete(id).pipe(
            switchMap(EntityResult.errorOrSuccess)
        )
    }
}

export type { AdsType, FiltersProps };
export { PromotionAdsAggregate };