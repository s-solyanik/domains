import {Observable} from "rxjs";

import { Data } from "data/core/data";

import { FAILURE_MESSAGE, Result } from "utils/result/dto";
import type { UsersBlockingType} from "domains/entities/users.blocking";

const initial: UsersBlockingType = {
    blockedAt: new Date(),
    profileId: 12321321321,
};

class OutgoingBlockingData extends Data {
    read() {
        return new Observable<Result<{ items: UsersBlockingType[]; total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [initial],
                total: 1
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new OutgoingBlockingData();
    }
}

export { OutgoingBlockingData }