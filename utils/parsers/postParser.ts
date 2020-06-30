import { Post } from '../../interfaces';

const postParser = (data: Record<string, unknown>): Manifest => {
    const parsedData: Post = {
        title: data.fields?.title,
        description: data.fields?.description,
        body: data.fields?.body,
    };
    return parsedData;
};

export default postParser;
