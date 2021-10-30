import { take, switchMap} from "rxjs/operators";

import { Application } from "application/main";

import { User } from "domains/test/user";
import { UserFingerPrint } from "domains/test/fingerptint";

const user = User.shared('U.as123123213-masdsa-asdqwe12-213');

user.data().pipe(
    take(1),
    switchMap(it => UserFingerPrint.shared(it.identifier).data()),
).subscribe(it => {
    Application.shared().logger.debug('Record, Value %s', JSON.stringify(it));
});

user.data().subscribe(it => {
    Application.shared().logger.debug('Record ID: %s, Value %s', user.id.toString(), JSON.stringify(it));
});

user.update({ firstName: 'Adam' }).subscribe(() => ({}));

