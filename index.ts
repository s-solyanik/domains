import {Application} from "application/main";

import {UsersBlockingAggregate} from "domains/aggregates/users/blocking";

const entity = UsersBlockingAggregate.shared('123', {
    page: 1,
    pagesize: 20
});

entity.data().subscribe(it => {
    Application.shared().logger.debug('Out ID %s value %s', entity.id.toString(), JSON.stringify(it));
})

entity.incoming('321', {
    page: 1,
    pagesize: 20
}).data().subscribe(it => {
    Application.shared().logger.debug('In ID %s value %s', entity.id.toString(), JSON.stringify(it));
})