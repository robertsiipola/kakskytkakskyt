import { createClient } from 'contentful';
import { Post, BlogPostJSON } from '../../interfaces';
import postsParser from '../parsers/postsParser';

const client = createClient({
    space: <string>process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: <string>process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

interface Item {
    fields: {
        [slug: string]: string;
    };
    sys: unknown;
}

const fetchAllSlugs = async (): Promise<Array<string>> => {
    const entries = await client.getEntries({
        content_type: 'blogPost',
        select: 'fields.slug',
    });

    const slugs = entries.items.map((item) => {
        const typeSafeItem = item as Item;
        return typeSafeItem.fields.slug;
    });

    return slugs;
};

export const fetchAllWithSlugs = async (): Promise<Post[] | undefined> => {
    const data = await client.getEntries({
        content_type: 'blogPost',
    });

    const entries = data.items as BlogPostJSON[];
    const posts = postsParser(entries);

    return posts;
};

export default fetchAllSlugs;
