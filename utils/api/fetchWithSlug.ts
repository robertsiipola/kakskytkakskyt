import { Post } from '../../interfaces';
import postsParser from '../parsers/postsParser';

const fetchWithSlug = async (slug: (string | string[]) | null): Promise<Post> => {
    if (slug && typeof slug === 'string') {
        const url = `https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT_ID}/entries?content_type=blogPost&fields.slug=${slug}`;
        const token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        });
        const data = await res.json();
        const posts = postsParser(data);
        if (posts.length === 1) {
            return posts[0];
        } else {
            throw new Error('Multiple posts found with the same slug!');
        }
    } else {
        throw new Error('No slug found or multiple slugs received. Can not identify blog post');
    }
};

export default fetchWithSlug;
