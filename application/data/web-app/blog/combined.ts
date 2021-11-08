import {Observable} from "rxjs";

import { Data } from "data/core/data";

import type {BlogPostType} from "domains/entities/blog.post";
import type {BlogCategoriesType} from "domains/entities/blog.categories";
import type {FiltersProps} from "domains/web-app/aggregates/blog/posts";
import {FAILURE_MESSAGE, Result} from "utils/result/dto";


type Test = {
    categories: BlogCategoriesType[]
    posts: Array<{
        filters: FiltersProps
        items: BlogPostType[]
        total: number
    }>
    post: BlogPostType[]
}

class BlogCombinedData extends Data {
    read(filters: any) {
        return new Observable<Result<Test, FAILURE_MESSAGE>>(observer => {
            observer.next(Result.success({
                categories: [],
                posts: [],
                post: []
            }));
            observer.complete();
        })
    }

    static get facade() {
        return new BlogCombinedData();
    }
}

export { BlogCombinedData }