import { singleton } from "utils/singleton";

import { EntityArrayWithState } from "domains/core/entity/array-with-state";

import type { PromotionCodeEntity, PromotionCodeType } from "domains/common/promotions.code";

import type { FiltersProps } from "domains/test/promotions/entity";
import { PromotionCodesEntity } from "domains/test/promotions/entity";

class PromotionsCodesEntityWithState {
    static shared = singleton((filters: FiltersProps) => {
        return new EntityArrayWithState<PromotionCodeEntity[], PromotionCodeType>(new PromotionCodesEntity(filters))
    })
}

export { PromotionsCodesEntityWithState };