
import { Application } from "application/main";

import { Codes } from "domains/test/promotions/codes";

const codes = Codes.shared({
    page: 1,
    pagesize: 20,
    orderby: 'desc',
    couponType: 'type'
})

codes.data().subscribe(it => {
    Application.shared().logger.debug('Record ID: %s, Value %s', codes.id.toString(), JSON.stringify(it));
})