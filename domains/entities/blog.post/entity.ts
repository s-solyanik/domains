import replaceExt from 'replace-ext';

import type { IdentifierI } from 'utils/unique-id';

import { Entity } from 'domains/core/entity';

import type { BlogPostType } from 'domains/entities/blog.post/type';
import { BlogPostValueObject } from 'domains/entities/blog.post/value-object';

interface BlogPostProps {
    readonly id: IdentifierI
    readonly value: BlogPostValueObject
}

class BlogPostEntity extends Entity<BlogPostProps>{
    public get() {
        return this.props.value.get();
    }

    public transformMediaToWebp() {
        return {
            ...this.props.value.get(),
            content: this.props.value.get().content?.replace(
                /(https:\/\/cdn.dilmil.co\/blog\/.*\.(?:png|jpg|jpeg))/i,
                (match) => {
                    console.log(match);
                    return replaceExt(match, '.webp');
                })
        };
    }

    static id(id: string) {
        return BlogPostEntity.createId(`blog.posts.${id}`);
    }

    static factory(props: BlogPostType) {
        return new BlogPostEntity({
            id: BlogPostEntity.id(`${props.id}`),
            value: BlogPostValueObject.factory(props)
        });
    }
}

export { BlogPostEntity };
