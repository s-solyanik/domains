import { Application } from "application/main";

import { CODES_TEMP } from "data/codes";
import { PromotionsCodesEntityWithState } from "domains/test/promotions/with-state";

const codes = PromotionsCodesEntityWithState.shared({
    page: 1,
    pagesize: 20,
    orderby: 'desc',
    couponType: 'test'
});

codes.data().subscribe(it => {
    Application.shared().logger.debug('Id %s value %s', codes.id.toString(), JSON.stringify(it))
})

codes.update(0, {
    ...CODES_TEMP,
    promoCode: "NEW CODE Updates"
}).subscribe()
