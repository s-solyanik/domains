import {Application} from "application/main";

import {IdentityPhoneAggregate} from "domains/aggregates/indentity/phone";

const entity = IdentityPhoneAggregate.shared();

entity.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', entity.id.toString(), JSON.stringify(it));
})
