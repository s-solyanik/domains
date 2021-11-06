import {Observable} from "rxjs";

import { Data } from "application/data/core/data";

import type { FiltersProps, UserMatchesType } from "domains/admin/aggregates/users/matches";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

const Value: UserMatchesType = {
    createdAt: new Date("2021-08-07 09:24:32 +0000"),
    hasMessages: true,
    id: 1363018003014667,
    matchAlgo: "unknown",
    matchProfile: {
        firstName: "Pratap",
        lastName: "Marripudi",
        id: 1363018,
        url: new URL("https://test.co/profiles/1363018")
    },
    updatedAt: new Date("2021-11-05 09:08:20 +0000"),
    uuid: "6c2ab088-3643-55f6-8fc7-50c13d181b17"
}

class UserMatchesData extends Data {
    read(filters: FiltersProps) {
        return new Observable<Result<{ items: UserMatchesType[], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [Value],
                total: 1
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new UserMatchesData();
    }
}

export { UserMatchesData }