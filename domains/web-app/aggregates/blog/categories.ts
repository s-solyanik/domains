import {switchMap, map} from "rxjs/operators";

import type {IdentifierI} from "utils/unique-id";
import {singleton} from "utils/singleton";
import {Result} from "utils/result/dto";

import {EntityResult} from "domains/core/entity/result";
import {ToDoList} from "domains/core/to-do-list";

import type {BlogCategoriesType} from "domains/entities/blog.categories";
import {BlogCategoriesEntity} from "domains/entities/blog.categories";

import {BlogCategoriesData} from "data/blog/categories";

class BlogCategoriesAggregate {
    static shared = singleton(() => new BlogCategoriesAggregate());

    public readonly id: IdentifierI;
    private readonly todo: ToDoList<BlogCategoriesEntity>;

    private constructor() {
        this.id = BlogCategoriesEntity.id('list');
        this.todo = new ToDoList<BlogCategoriesEntity>(this.id, this.read, 7.2e+6);
    }

    private read = () => {
        return BlogCategoriesData.facade.read().pipe(
            switchMap(it => EntityResult.array(BlogCategoriesEntity.factory, it)),
        )
    }

    //TODO remove preset. It was made for combine request (categories, posts)
    public set(categories: BlogCategoriesType[]) {
        categories.map(category => {
            this.todo.add(Result.success(BlogCategoriesEntity.factory(category)));
        })
    }

    public data() {
        return this.todo.get().pipe(
            switchMap(it => EntityResult.arrayGet<BlogCategoriesEntity, BlogCategoriesType>(it))
        );
    }
}

export type {BlogCategoriesType};
export {BlogCategoriesAggregate};