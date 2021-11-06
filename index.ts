import {Application} from "application/main";

import {UserAggregate} from "domains/admin/aggregates/users/profile";

const entity = UserAggregate.shared('Uasdasd');

entity.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', entity.id.toString(), JSON.stringify(it));
})
