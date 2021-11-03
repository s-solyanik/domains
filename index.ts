import { Application } from "application/main";

import { CODES_TEMP } from "data/codes";
import { PromotionCodesAggregate } from "domains/aggregates/promotions/codes";

const codes = PromotionCodesAggregate.shared({
    page: 1,
    pagesize: 20,
    orderby: 'desc',
    couponType: 'test'
})

codes.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', codes.id.toString(), it.value.total)
})

codes.create(CODES_TEMP).subscribe()
codes.create(CODES_TEMP).subscribe()
codes.create(CODES_TEMP).subscribe()


codes.update(1, {
    promoCode: 'New update'
}).subscribe()
codes.delete(3).subscribe()