import {switchMap, take} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {Result} from "utils/result/dto";
import {singleton} from "utils/singleton";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import type {BlogPostType} from "domains/entities/blog.post";
import {BlogPostEntity} from "domains/entities/blog.post";

import {BlogPostsData} from "data/blog/posts";

type FiltersProps = {
    page?: number
    per_page?: number
    slug?: string
    exclude?: number[]
    include?: number[]
    offset?: number
    status?: string
    categories?: number[]
    categories_exclude?: number[]
    sticky?: boolean
    orderby?: 'author'|'date'|'id'|'include'|'modified'|'parent'|'relevance'|'slug'|'include_slugs'|'title'
    _embed?: 1
}

class BlogPostsAggregate {
    static shared = singleton((filters: FiltersProps) => new BlogPostsAggregate(filters));

    public readonly id: IdentifierI;
    private readonly filters: FiltersProps;
    private readonly todo: ToDoList<BlogPostEntity>;

    private constructor(filters: FiltersProps) {
        this.id = BlogPostEntity.id('list');
        this.filters = filters;
        this.todo = new ToDoList<BlogPostEntity>(this.id, this.read, 300);
    }

    private read = () => {
        return BlogPostsData.facade.read(this.filters).pipe(
            switchMap(it => EntityResult.array(BlogPostEntity.factory, it)),
        )
    }

    public next(page: number) {
        BlogPostsData.facade.read({ ...this.filters, page }).pipe(take(1)).subscribe(it => {
            if(!it.isSuccessful) {
                return;
            }

            it.value.items.forEach(item => {
                this.todo.add(Result.success(item));
            })
        })
    }

    //TODO remove preset. It was made for combine request (categories, posts)
    public set(posts: BlogPostType[]) {
        posts.map(post => {
            this.todo.add(Result.success(BlogPostEntity.factory(post)));
        })
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<BlogPostEntity, BlogPostType>(it))
        );
    }
}

export type {BlogPostType, FiltersProps};
export {BlogPostsAggregate};