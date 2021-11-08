import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type {BlogPostType} from "domains/entities/blog.post";
import {BlogPostEntity} from "domains/entities/blog.post";

import {BlogPostData} from "data/web-app/blog/post";

class BlogPostAggregate {
    static shared = singleton((slug: string) => new BlogPostAggregate(slug));

    public readonly id: IdentifierI;
    private readonly state: State<BlogPostEntity>;

    private constructor(slug: string) {
        this.id = BlogPostEntity.id(slug);
        this.state = new State<BlogPostEntity>(this.id, () => this.read(slug), 7.2e+6);
    }

    private read = (slug: string) => {
        return BlogPostData.facade.read(slug).pipe(
            switchMap(it => EntityResult.unit(BlogPostEntity.factory, it))
        )
    }

    //TODO remove preset. It was made for combine request (categories, posts)
    public set(post: BlogPostType) {
        this.state.update(Result.success(BlogPostEntity.factory(post)));
    }

    public data() {
        return this.state.data().pipe(
            switchMap(it => EntityResult.unitGet<BlogPostEntity, BlogPostType>(it))
        );
    }
}

export type {BlogPostType};
export {BlogPostAggregate};