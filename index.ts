import { Application } from "application/main";

import { CODES_TEMP } from "data/codes";
import { PromotionsCodesEntityWithState } from "domains/test/promotions/with-state";

const codes = PromotionsCodesEntityWithState.shared({
    page: 1,
    pagesize: 20,
    orderby: 'desc',
    couponType: 'test'
})

codes.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', codes.id.toString(), JSON.stringify(it))
})

codes.create(CODES_TEMP).subscribe()


codes.update(1, {
    promoCode: 'New update'
}).subscribe()