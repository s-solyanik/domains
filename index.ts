import {Application} from "application/main";

import {UserUnmatchedAggregate} from "domains/aggregates/users/unmatches";

const outgoing = UserUnmatchedAggregate.shared('123', {
    page: 1,
    pagesize: 20
});

outgoing.data().subscribe(it => {
    Application.shared().logger.debug('Out ID %s value %s', outgoing.id.toString(), JSON.stringify(it));
})
