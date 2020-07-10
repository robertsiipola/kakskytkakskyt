import { Post, BlogPostJSON, RawPost } from '../../interfaces';

export const postParser = (post: RawPost): Post => {
    const parsedPost: Post = {
        title: post.title,
        description: post.description,
        body: post.body,
        slug: post.slug,
        tags: post.tags,
        author: post.author ? post.author.fields : null,
    };
    return parsedPost;
};

const postsParser = (entries: BlogPostJSON[]): Post[] => {
    // see the contentful API s
    if (entries.length > 0) {
        const posts = entries.map((el) => {
            return el.fields;
        });
        return posts;
    } else {
        throw new Error('No data found in the entries array');
    }
};

export default postsParser;
