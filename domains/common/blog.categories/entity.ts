import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { BlogCategoriesType } from 'domains/common/blog.categories/type';
import { BlogCategoriesValueObject } from 'domains/common/blog.categories/value-object';

interface BlogCategoriesProps {
    readonly id: IdentifierI
    readonly value: BlogCategoriesValueObject
}

class BlogCategoriesEntity extends Entity<BlogCategoriesProps> {
    public get() {
        return this.props.value.get();
    }

    static id(id: number) {
        return BlogCategoriesEntity.createId('blog.categories');
    }

    static factory(props: BlogCategoriesType) {
        return new BlogCategoriesEntity({
            id: BlogCategoriesEntity.id(props.id),
            value: BlogCategoriesValueObject.factory(props)
        });
    }
}

export { BlogCategoriesEntity };
