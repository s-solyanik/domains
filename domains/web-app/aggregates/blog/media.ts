import {switchMap} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {State} from "domains/core/state";

import type {BlogMediaType} from "domains/entities/blog.media";
import {BlogMediaEntity} from "domains/entities/blog.media";

import {BlogMediaData} from "data/web-app/blog/media";

class BlogMediaAggregate {
    static shared = singleton((id: number) => new BlogMediaAggregate(id));

    public readonly id: IdentifierI;
    private readonly state: State<BlogMediaEntity>;

    private constructor(id: number) {
        this.id = BlogMediaEntity.id(id);
        this.state = new State<BlogMediaEntity>(this.id, () => this.read(id), 7.2e+6);
    }

    private read = (id: number) => {
        return BlogMediaData.facade.read(id).pipe(
            switchMap(it => EntityResult.unit(BlogMediaEntity.factory, it))
        )
    }

    //TODO remove preset. It was made for combine request (categories, posts)
    public set(media: BlogMediaType) {
        this.state.update(Result.success(BlogMediaEntity.factory(media)));
    }

    public data() {
        return this.state.data().pipe(
            switchMap(it => EntityResult.unitGet<BlogMediaEntity, BlogMediaType>(it))
        );
    }
}

export type {BlogMediaType};
export {BlogMediaAggregate};