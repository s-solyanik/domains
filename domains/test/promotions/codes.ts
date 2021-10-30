import {switchMap} from "rxjs";
import {map, tap, take} from "rxjs/operators";

import {singleton} from "utils/singleton";
import {IdentifierI} from "utils/unique-id";

import type { PromotionCodeType } from "domains/common/promotions.code";
import { PromotionCodeEntity } from "domains/common/promotions.code";

import {domainsEntry} from "domains/core/singleton";

import { CodesData } from "data/codes";

type FiltersProps = {
    page: number
    pagesize: number
    orderby: 'desc'|'id'|'id.desc'
    couponType: string
}

const TTL = 300;

class Codes {
    static shared = singleton((filters: FiltersProps) => new Codes(filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;

    private constructor(filters: FiltersProps) {
        this.id = PromotionCodeEntity.id('list');
        this.filters = filters;
    }

    private get entity() {
        return domainsEntry.entity<PromotionCodeEntity[]>(this.id, this.read);
    }

    private read = () => {
        return CodesData.facade.read(this.filters).pipe(
            map(it => ({
                data: it.map(PromotionCodeEntity.factory),
                expiration: TTL
            }))
        )
    }

    public data() {
        return this.entity.data().pipe(
            map(it => it.map(i => i.value.get()))
        );
    }

    public create(value: PromotionCodeType) {
        return CodesData.facade.create(value).pipe(
            switchMap((newRecord) => {
                return this.entity.data().pipe(
                    take(1),
                    tap(it => {
                        this.entity.update([PromotionCodeEntity.factory(newRecord), ...it], TTL)
                    })
                )
            }),
        )
    }

    public update(id: number, value: Partial<PromotionCodeType>) {
        return CodesData.facade.update(id, value).pipe(
            switchMap((forUpdate) => {

                return this.entity.data().pipe(
                    take(1),
                    tap(it => {
                        const updateResult = it.map(i => {
                            if(i.get().id === id) {
                                const updated = i.update(forUpdate);

                                if(!PromotionCodeEntity.isEntity(updated)) {
                                    throw new Error(JSON.stringify(updateResult));
                                }

                                return updated;
                            }
                            return i;
                        });

                        this.entity.update(updateResult, TTL);
                    })
                )
            }),
        )
    }

    public delete(id: number) {
        return CodesData.facade.delete(id).pipe(
            switchMap(() => {
                return this.entity.data().pipe(
                    take(1),
                    tap(it => this.entity.update(it.filter(i => i.get().id !== id), TTL))
                )
            }),
        )
    }
}

export type { PromotionCodeType, FiltersProps };
export { Codes };