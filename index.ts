import { Application } from "application/main";

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
