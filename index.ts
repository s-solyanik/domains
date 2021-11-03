import { Application } from "application/main";

import { UserAggregate } from "domains/aggregates/users";

const user = UserAggregate.shared('U.test-id');

user.data().subscribe(it => {
    Application.shared().logger.debug('ID %s value %s', user.id.toString(), JSON.stringify(it))
});


user.update({
    firstName: 'Jack'
}).subscribe(it => {
    if(it.isSuccessful) {
        return;
    }

    Application.shared().logger.error('Status %s message %s', it.error.status, it.error.message);
})