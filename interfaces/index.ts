// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export interface Author {
    id: string;
    firstName: string;
    lastName: string;
}

export interface Post {
    title: string;
    description: string;
    body: string;
    author: Author | null;
    tags: string[] | null;
    slug: string;
}

export interface RawPost {
    title: string;
    description: string;
    body: string;
    author: {
        [sys: string]: unknown;
        [fields: string]: Author;
    } | null;
    tags: string[] | null;
    slug: string;
}

export interface RawPostItemJson {
    sys: unknown;
    fields: RawPost;
}

export interface StateInterface {
    response: Post | null;
    loading: boolean;
    error: string | null;
}

export interface ClientInit {
    space: string | undefined;
    accessToken: string | undefined;
}

export interface BlogPostJSON {
    sys: unknown;
    fields: RawPost;
}

export interface BlogPostWithSlug {
    sys: unknown;
    total: unknown;
    skip: unknown;
    limit: unknown;
    items: BlogPostWithSlugEntryItem[];
    includes: unknown;
}
