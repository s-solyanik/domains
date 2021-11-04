import {Application} from "application/main";

import {ModerationImageAggregate, Sort, Deleted} from "domains/aggregates/moderation/queue";
import { Reason } from "domains/entities/users.moderation.image";

const entity = ModerationImageAggregate.shared({
    queueName: 'male',
    newestFirst: Sort.NEWEST,
    timestamp: Date.now(),
    page: 1,
    pagesize: 20,
    showDeleted: Deleted.FALSE
});

entity.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', entity.id.toString(), JSON.stringify(it));
})

entity.decline('I.GI2DCMNROSFNL5LQUI', Reason.CHILD_ADOLESCENT).subscribe();
