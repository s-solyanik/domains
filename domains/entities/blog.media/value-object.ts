import { ValueObject } from 'domains/core/entity/value-object';

import type { BlogMediaType } from 'domains/entities/blog.media/type';

class BlogMediaValueObject extends ValueObject<BlogMediaType> {
    static factory(code: BlogMediaType): BlogMediaValueObject {
        return new BlogMediaValueObject(code);
    }
}

export { BlogMediaValueObject };
