import {Application} from "application/main";

import {UserFingerPrintAggregate} from "domains/aggregates/indentity/fingerprint";

const entity = UserFingerPrintAggregate.shared('Uasdasd');

entity.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', entity.id.toString(), JSON.stringify(it));
})
