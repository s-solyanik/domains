import {Observable} from "rxjs";

import { Data } from "application/data/core/data";

import {FAILURE_MESSAGE, Result} from "utils/result/dto";
import type {BlogMediaType} from "domains/entities/blog.media";

const initial = [];

class BlogMediaData extends Data {
    read(imageId: number, media?: BlogMediaType) {
        return new Observable<Result<any, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success(true));
            observer.complete();
        })
    }

    static get facade() {
        return new BlogMediaData();
    }
}

export { BlogMediaData }