import {Observable} from "rxjs";

import { Data } from "application/data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";

const initial = {
    escalated: 0,
    female: 847,
    male: 2498,
    media: 591,
    other: 3,
    reported: 566,
    verification: 2338
};

class ModerationCategoriesData extends Data {
    read() {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(initial));
            observer.complete();
        })
    }

    static get facade() {
        return new ModerationCategoriesData();
    }
}

export { ModerationCategoriesData }