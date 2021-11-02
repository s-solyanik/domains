import type { BlogMediaType } from 'domains/common/blog.media';
import type { BlogCategoriesType } from 'domains/common/blog.categories';

export type BlogPostType = {
    id: number
    slug: string
    title: string
    date?: Date
    content?: string
    categories?: BlogCategoriesType[]
    media?: BlogMediaType
    seo?: string
    next?: {
        id: number
        slug: string
        title: string
        media?: BlogMediaType
    }
    previous?: {
        id: number
        slug: string
        title: string
        media?: BlogMediaType
    }
};
