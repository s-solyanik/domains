import {Application} from "application/main";

import {UserReportedAggregate} from "domains/aggregates/users/reported";

const outgoing = UserReportedAggregate.shared('123', {
    page: 1,
    pagesize: 20
});

outgoing.data().subscribe(it => {
    Application.shared().logger.debug('Out ID %s value %s', outgoing.id.toString(), JSON.stringify(it));
})
