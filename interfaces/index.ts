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

export interface BlogPost {
    id: string;
    title: string;
    media?: string;
    description: string;
    body: string;
    author: Author;
    publishDate: string;
    tags?: string[];
    slug: string;
}

export interface Post {
    title: string;
    description: string;
    body: string;
}

export interface StateInterface {
    response: BlogPost | null;
    loading: boolean;
    error: string | null;
}
