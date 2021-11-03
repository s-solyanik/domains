import { ValueObject } from 'domains/core/entity/value-object';
import type { BlogCategoriesType } from 'domains/entities/blog.categories/type';

class BlogCategoriesValueObject extends ValueObject<BlogCategoriesType> {
    static factory(code: BlogCategoriesType): BlogCategoriesValueObject {
        return new BlogCategoriesValueObject(code);
    }
}

export { BlogCategoriesValueObject };
