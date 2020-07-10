import { createClient } from 'contentful';
import { Post, RawPostItemJson } from '../../interfaces';
import { postParser } from '../parsers/postsParser';

const client = createClient({
    space: <string>process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: <string>process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

const fetchWithId = async (id: string): Promise<Post> => {
    const data = await client.getEntry(id);
    const entry = data as RawPostItemJson;
    const post = postParser(entry.fields);

    return post;
};

export default fetchWithId;
