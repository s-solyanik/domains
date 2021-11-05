import {Application} from "application/main";

import {UserPurchasesAggregate} from "domains/aggregates/users/purchases";

const outgoing = UserPurchasesAggregate.shared('123', {
    page: 1,
    pagesize: 20
});

outgoing.data().subscribe(it => {
    Application.shared().logger.debug('Out ID %s value %s', outgoing.id.toString(), JSON.stringify(it));
})
