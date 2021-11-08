import {Observable} from "rxjs";

import { Data } from "data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";

class BlogPostData extends Data {
    read(slug: string) {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    static get facade() {
        return new BlogPostData();
    }
}

export { BlogPostData }