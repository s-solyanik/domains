import {Application} from "application/main";

import {UsersBlockingAggregate} from "domains/aggregates/users/blocking";

const outgoing = UsersBlockingAggregate.shared('123', {
    page: 1,
    pagesize: 20
});

outgoing.data().subscribe(it => {
    Application.shared().logger.debug('Out ID %s value %s', outgoing.id.toString(), JSON.stringify(it));
})

const incoming = outgoing.incoming('321', {
    page: 1,
    pagesize: 20
})

incoming.data().subscribe(it => {
    Application.shared().logger.debug('In ID %s value %s', incoming.id.toString(), JSON.stringify(it));
})