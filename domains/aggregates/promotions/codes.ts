import { switchMap, map } from "rxjs/operators";

import type { IdentifierI } from "utils/unique-id";
import { Result } from "utils/result/dto";
import { singleton } from "utils/singleton";

import { EntityResult } from "domains/core/entity/result";
import { ToDoList } from "domains/core/entity/to-do-list";

import type { PromotionCodeType } from "domains/entities/promotions.code";
import { PromotionCodeEntity } from "domains/entities/promotions.code";

import { CodesData } from "data/codes";

type FiltersProps = {
    page: number
    pagesize: number
    orderby: 'desc'|'id'|'id.desc'
    couponType: string
}

class PromotionCodesAggregate {
    static shared = singleton((filters: FiltersProps) => new PromotionCodesAggregate(filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;
    private readonly todo: ToDoList<PromotionCodeEntity>;

    constructor(filters: FiltersProps) {
        this.id = PromotionCodeEntity.id('list');
        this.filters = filters;
        this.todo = new ToDoList<PromotionCodeEntity>(this.id, this.read, 300);
    }

    private read = () => {
        return CodesData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(PromotionCodeEntity.factory, it)),
        )
    }

    public create(value: PromotionCodeType) {
        return CodesData.facade.create(value).pipe(
            switchMap(it => EntityResult.unit(PromotionCodeEntity.factory, it)),
            switchMap(this.todo.add)
        )
    }

    public update(id: number, value: Partial<PromotionCodeType>) {
        return CodesData.facade.update(id, value).pipe(
            switchMap(it => EntityResult.unit(PromotionCodeEntity.factory, it)),
            switchMap(this.todo.update)
        )
    }

    public delete(id: number) {
        return CodesData.facade.delete(id).pipe(
            map((it) => {
                return it.isSuccessful ? Result.success(PromotionCodeEntity.id(`${id}`)) : Result.failure(it.error)
            }),
            switchMap(this.todo.remove)
        )
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<PromotionCodeEntity, PromotionCodeType>(it))
        );
    }
}

export type { PromotionCodeType, FiltersProps };
export { PromotionCodesAggregate };