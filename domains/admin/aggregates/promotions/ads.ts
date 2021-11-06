import { switchMap, map } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { Result } from "utils/result/dto";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import { ToDoList } from "domains/core/to-do-list";

import type { AdsType } from "domains/entities/promotions";
import { AdsEntity } from "domains/entities/promotions";

import { AdsData } from "data/promotion/ads";

type FiltersProps = {
    orderby?: 'desc'|'id'|'startDate.desc,id'
    page?: number
    pagesize?: number
    trackads?: 0|1
    country?: string
    gender?: string
    isSecureGet?: boolean
}

class PromotionAdsAggregate {
    static shared = singleton((filters: FiltersProps) => new PromotionAdsAggregate(filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;
    private readonly todo: ToDoList<AdsEntity>;

    private constructor(filters: FiltersProps) {
        this.id = AdsEntity.id('list');
        this.filters = filters;
        this.todo = new ToDoList<AdsEntity>(this.id, this.read, 300);
    }

    private read = () => {
        return AdsData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(AdsEntity.factory, it)),
        )
    }

    public create(value: AdsType) {
        return AdsData.facade.create(value).pipe(
            switchMap(it => EntityResult.unit(AdsEntity.factory, it)),
            switchMap(this.todo.add)
        )
    }

    public update(id: number, value: Partial<AdsType>) {
        return AdsData.facade.update(id, value).pipe(
            switchMap(it => EntityResult.unit(AdsEntity.factory, it)),
            switchMap(this.todo.update)
        )
    }

    public delete(id: number) {
        return AdsData.facade.delete(id).pipe(
            map((it) => {
                return it.isSuccessful ? Result.success(AdsEntity.id(`${id}`)) : Result.failure(it.error)
            }),
            switchMap(this.todo.remove)
        )
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<AdsEntity, AdsType>(it))
        );
    }
}

export type { AdsType, FiltersProps };
export { PromotionAdsAggregate };