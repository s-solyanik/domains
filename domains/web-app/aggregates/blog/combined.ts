import { Observable, of, combineLatest, forkJoin } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import type {IdentifierI} from "utils/unique-id";
import {UID} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result, FAILURE_MESSAGE} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {Entity} from "domains/core/entity";
import {State} from "domains/core/state";

import {BlogCategoriesAggregate} from "domains/web-app/aggregates/blog/categories";
import {BlogPostsAggregate} from "domains/web-app/aggregates/blog/posts";
import {BlogPostAggregate} from "domains/web-app/aggregates/blog/post";


import {BlogCombinedData} from "data/web-app/blog/combined";

type LayoutFiltersProps = {
    layouts: string
    'filters.posts': string
}

class BlogCombinedAggregate {
    static shared = singleton((filters: LayoutFiltersProps) => new BlogCombinedAggregate(filters));

    public readonly id: IdentifierI;
    private readonly filters: LayoutFiltersProps;
    private readonly state: State<boolean>;

    private constructor(filters: LayoutFiltersProps) {
        this.id = UID.factory(Entity.name, 'blog.combined.request');
        this.filters = filters;
        this.state = new State<boolean>(this.id, this.read, 0);
    }

    private read = () => {
        return BlogCombinedData.facade.read(this.filters).pipe(
            switchMap(it => {
                if(!it.isSuccessful) {
                    return of(Result.failure(it.error));
                }

                BlogCategoriesAggregate.shared().set(it.value.categories);

                const combineAll: [Observable<Result<boolean, FAILURE_MESSAGE>>] = [
                    BlogCategoriesAggregate.shared().data().pipe(
                        map(it => {
                            if(it.isSuccessful) {
                                return Result.success(true);
                            }

                            return Result.failure(it.error);
                        })
                    )
                ];

                if(it.value.posts.length) {
                    combineAll.push(
                        forkJoin(
                            it.value.posts.map(({ items, total, filters }) => {
                                BlogPostsAggregate.shared(filters).set(items);
                                return BlogPostsAggregate.shared(filters).data().pipe(take(1));
                            })
                        ).pipe(
                            map(() => Result.success(true))
                        )
                    );
                }


                if(it.value.post.length) {
                    combineAll.push(
                        forkJoin(
                            it.value.post.map((post) => {
                                BlogPostAggregate.shared(post.slug).set(post);
                                return BlogPostAggregate.shared(post.slug).data().pipe(take(1));
                            })
                        ).pipe(
                            map(() => Result.success(true))
                        )
                    );
                }

                //wait until values will be set to aggregates then resolve observer
                return combineLatest(combineAll).pipe(
                    take(1),
                    switchMap(([it]: [Result<any, FAILURE_MESSAGE>]) => EntityResult.errorOrSuccess(it))
                )
            })
        )
    }

    public data() {
        return this.state.data();
    }
}

export {BlogCombinedAggregate};