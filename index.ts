import { Application } from "application/main";

import { DialogsMessagesAggregate } from "domains/aggregates/dialogs/messages";

const dialog = DialogsMessagesAggregate.shared(1, 2, {
    page: 1,
    pagesize: 20,
    orderBy: 'asc'
})

dialog.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', dialog.id.toString(), JSON.stringify(it))
});

