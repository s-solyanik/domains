import {Application} from "application/main";

import {ProfilesAggregate} from "domains/admin/aggregates/users/profiles";

const entity = ProfilesAggregate.shared();

entity.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', entity.id.toString(), JSON.stringify(it));
})
