import { ValueObject } from 'domains/core/entity/value-object';
import type { BlogPostType } from 'domains/common/blog.post/type';

class BlogPostValueObject extends ValueObject<BlogPostType> {
    static factory(code: BlogPostType): BlogPostValueObject {
        return new BlogPostValueObject(code);
    }
}

export { BlogPostValueObject };
