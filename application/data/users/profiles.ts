import {Observable} from "rxjs";

import { Data } from "data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";
import type { UserI, FiltersProps } from "domains/admin/aggregates/users/profiles";
import { USER } from "data/users/user-data";

const initial: UserI = {
    data: USER.data,
    location: USER.location,
    media: USER.media,
    meta: USER.meta
};

class ProfilesData extends Data {
    read(filters: FiltersProps) {
        return new Observable<Result<{ items: UserI[], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [initial],
                total: 1
            }));
            observer.complete();
        })
    }

    sendAction(id: number, payload: any) {
        return new Observable(observer => {
            observer.next(Result.success());
            observer.complete();
        })
    }

    static get facade() {
        return new ProfilesData();
    }
}

export { ProfilesData }