import {Observable} from "rxjs";

import { Data } from "application/data/core/data";

import type { FiltersProps, UserUnmatchedType } from "domains/admin/aggregates/users/unmatches";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

const Value: UserUnmatchedType = {
    action: "unmatch",
    createdAt: new Date("2021-11-05 07:59:22 +0000"),
    interestProfile: {
        firstName: "Gurpreet",
        lastName: "Bharj",
        id: 2764639,
        url: new URL("https://test.co/profiles/2764639")
    },
    note: "",
    id: 1296160,
    reason: "unresponsive"
}

class UserUnmatchedData extends Data {
    read(filters: FiltersProps) {
        return new Observable<Result<{ items: UserUnmatchedType[], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [Value],
                total: 1
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new UserUnmatchedData();
    }
}

export { UserUnmatchedData }