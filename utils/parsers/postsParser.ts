import * as _ from 'lodash/';
import { Post, Author } from '../../interfaces';
import { authorParser } from './authorParser';

export const postParser = (data: Record<string, unknown>, author?: Author): Post => {
    const parsedData: Post = {
        title: <string>_.get(data, 'fields.title', 'N/A'),
        description: <string>_.get(data, 'fields.description', 'N/A'),
        body: <string>_.get(data, 'fields.body', 'N/A'),
        slug: <string>_.get(data, 'fields.slug', 'N/A'),
        tags: <string[]>_.get(data, 'fields.tags', null),
        author: author ? author : null,
    };
    return parsedData;
};

const postsParser = (data: Record<string, unknown>): Post[] => {
    // see the contentful API docs
    if (_.has(data, 'items')) {
        const items: Array<Record<string, unknown>> = <Array<Record<string, unknown>>>data.items;
        const includes: Record<string, unknown> = <Record<string, unknown>>data.includes;
        const entries: Array<Record<string, unknown>> = <Array<Record<string, unknown>>>includes?.Entry;

        const authors: Author[] | null = entries
            ? entries.map((el) => {
                  return authorParser(el);
              })
            : null;

        if (items.length > 0) {
            const parsedData: Post[] = items.map((el) => {
                const authorId: string | null = <string | null>_.get(el, 'fields.author.sys.id', null);
                if (authorId && authors) {
                    const author = authors.filter((el) => el.id === authorId)[0];
                    return postParser(el, author);
                } else {
                    return postParser(el);
                }
            });
            return parsedData;
        } else {
            throw new Error('Either no data or some other error with the response');
        }
    } else {
        throw new Error('No item object found in response');
    }
};

export default postsParser;
