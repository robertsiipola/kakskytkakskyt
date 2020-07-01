import * as _ from 'lodash/';
import { Post } from '../../interfaces';

const postParser = (data: unknown): Post => {
    if (typeof data === 'object' && data !== null) {
        const parsedData: Post = {
            title: _.get(data, 'fields.title', 'ERROR!'),
            description: _.get(data, 'fields.description', 'ERROR!'),
            body: _.get(data, 'fields.body', 'ERROR!'),
        };
        return parsedData;
    } else {
        throw new Error('Data was either not an object or was null!');
    }
};

export default postParser;
