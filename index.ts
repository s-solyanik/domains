import {Application} from "application/main";

import {ProfilesAggregate} from "domains/admin/aggregates/users/profiles";

const entity = ProfilesAggregate.shared({
    page: 1,
    pagesize: 20
});

entity.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', entity.id.toString(), JSON.stringify(it));
})
