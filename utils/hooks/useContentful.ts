import { useEffect, useReducer } from 'react';
import { StateInterface, Post } from '../../interfaces/index';
import { createClient } from 'contentful';
import postParser from '../parsers/postParser';

// type ActionType = {
//     type: 'LOADING' | 'COMPLETE' | 'ERROR';
// };

type ActionType = { type: 'LOADING' } | { type: 'COMPLETE'; response: Post } | { type: 'ERROR'; error: string };

const initialState: StateInterface = {
    response: null,
    loading: false,
    error: null,
};

const client = createClient({
    space: <string>process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: <string>process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

const contentfulReducer = (state: StateInterface, action: ActionType) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true };
        case 'COMPLETE':
            return { ...state, response: action.response, loading: false };
        case 'ERROR':
            return { ...state, loading: false, error: action.error };
        default:
            throw new Error('Something went wrong');
    }
};

const useContentful = (): [Post | null, boolean, string | null] => {
    const [state, dispatch] = useReducer(contentfulReducer, initialState);
    const id: string | undefined = process.env.NEXT_PUBLIC_MANIFEST_ID;

    useEffect(() => {
        dispatch({ type: 'LOADING' });
        if (id) {
            client
                .getEntry(id)
                .then((entry) => {
                    dispatch({ type: 'COMPLETE', response: postParser(entry) });
                })
                .catch((error) => dispatch({ type: 'ERROR', error: error.message }));
        } else {
            dispatch({ type: 'ERROR', error: 'ID undefined' });
        }
    }, [id]);

    return [state.response, state.loading, state.error];
};

export default useContentful;
