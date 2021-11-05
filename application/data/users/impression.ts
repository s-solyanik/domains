import {Observable} from "rxjs";

import { Data } from "data/core/data";

import type { UserImpressionType, FiltersProps } from "domains/aggregates/users/impression";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";

const initial: UserImpressionType = {
    date: new Date( "2021-11-05"),
    count: 22
};

class UserImpressionData extends Data {
    read(filters: FiltersProps) {
        return new Observable<Result<{ items: UserImpressionType[], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [initial],
                total: 1
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new UserImpressionData();
    }
}

export { UserImpressionData }