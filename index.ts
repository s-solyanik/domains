import { Application } from "application/main";

import { UserFingerPrint } from "domains/test/entity";

const entity = UserFingerPrint.shared('42', {
    page: 1,
    perPage: 20
});

entity.data().subscribe(it => {
    Application.shared().logger.debug('Record ID: %s, Value %s', entity.id.toString(), JSON.stringify(it));
});


entity.update({ user: 'user-2123' }).subscribe(() => ({}));

