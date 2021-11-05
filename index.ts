import {Application} from "application/main";

import {UserImpressionAggregate} from "domains/aggregates/users/impression";

const outgoing = UserImpressionAggregate.shared('123', {
    page: 1,
    pagesize: 20
});

outgoing.data().subscribe(it => {
    Application.shared().logger.debug('Out ID %s value %s', outgoing.id.toString(), JSON.stringify(it));
})
