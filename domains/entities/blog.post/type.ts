import type { BlogMediaType } from 'domains/entities/blog.media';
import type { BlogCategoriesType } from 'domains/entities/blog.categories';

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
