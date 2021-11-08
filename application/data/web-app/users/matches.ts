import {Observable} from "rxjs";

import { Data } from "data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";


class UsersMatchesData extends Data {
    read(fingerprint: any) {
        return new Observable<Result<{  items: [], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [],
                total: 0
            }));
            observer.complete();
        })
    }

    create(id: string, action: any, fingerprint: any) {
        return new Observable<Result<boolean, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    static get facade() {
        return new UsersMatchesData();
    }
}

export { UsersMatchesData }