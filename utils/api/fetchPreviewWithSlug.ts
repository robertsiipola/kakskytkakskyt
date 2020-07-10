import { Post, BlogPostJSON } from '../../interfaces';
import postsParser from '../parsers/postsParser';
import { createClient } from 'contentful';

const client = createClient({
    space: <string>process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: <string>process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    host: 'preview.contentful.com',
});

const fetchPreviewWithSlug = async (slug: (string | string[]) | null): Promise<Post | undefined> => {
    if (slug) {
        const data = await client.getEntries({
            content_type: 'blogPost',
            limit: 1,
            'fields.slug[in]': slug,
        });
        const entries = data.items as BlogPostJSON[];
        const posts = postsParser(entries);
        if (posts.length === 1) {
            return posts[0];
        } else {
            throw new Error('Multiple posts found with the same slug!');
        }
        throw new Error('No slug found or multiple slugs received. Can not identify blog post');
    }
};

export default fetchPreviewWithSlug;
