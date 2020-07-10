import * as _ from 'lodash/';
import { Author } from '../../interfaces';

export const authorParser = (data: Record<string, string>): Author => {
    const parsedData = {
        id: <string>_.get(data, 'sys.id', 'N/A'),
        firstName: <string>_.get(data, 'fields.firstName', 'N/A'),
        lastName: <string>_.get(data, 'fields.lastName', 'N/A'),
    };

    return parsedData;
};
