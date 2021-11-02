import replaceExt from 'replace-ext';

import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { BlogMediaType } from 'domains/common/blog.media/type';
import { BlogMediaValueObject } from 'domains/common/blog.media/value-object';

export interface BlogMediaProps {
    readonly id: IdentifierI
    readonly value: BlogMediaValueObject
}

class BlogMediaEntity extends Entity<BlogMediaProps> {
    public get() {
        return this.props.value.get();
    }

    public transformMediaToWebp() {
        const { id, src, meta: { medium, mediumLarge, large, small, full } } = this.props.value.get();

        return {
            id: id,
            src: replaceExt(src, '.webp'),
            meta: {
                full: replaceExt(full, '.webp'),
                large: replaceExt(large, '.webp'),
                medium: replaceExt(medium, '.webp'),
                mediumLarge: replaceExt(mediumLarge, '.webp'),
                small: replaceExt(small, '.webp')
            }
        };
    }

    static id(id: number) {
        return BlogMediaEntity.createId(`blog.media.${id}`);
    }

    static factory(props: BlogMediaType) {
        return new BlogMediaEntity({
            id: BlogMediaEntity.id(props.id),
            value: BlogMediaValueObject.factory(props)
        });
    }
}

export { BlogMediaEntity };
