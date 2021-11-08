import {Observable} from "rxjs";

import { Data } from "data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";

const initial = [];

class BlogCategoriesData extends Data {
    read() {
        return new Observable<Result<{  items: [], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [],
                total: 1
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new BlogCategoriesData();
    }
}

export { BlogCategoriesData }