import {Observable} from "rxjs";

import { Data } from "data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";

class BlogPostsData extends Data {
    read(filters: any) {
        return new Observable<Result<{  items: [], total: number }, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                items: [],
                total: 1
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new BlogPostsData();
    }
}

export { BlogPostsData }