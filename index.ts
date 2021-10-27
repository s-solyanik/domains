import { Application } from "application/main";
import { EntityTest } from "domains/test/entity";

const entity = new EntityTest('42', {
    page: 1,
    perPage: 20
});

entity.data().subscribe(it => {
    Application.shared().logger.debug('Record ID: %s, Value %s', entity.id.toString(), JSON.stringify(it));
});

entity.update({
    guid: 'test',
    user: 'user-2',
    client: 'web_01'
});

