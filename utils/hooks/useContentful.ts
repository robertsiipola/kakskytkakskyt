import { useEffect, useReducer } from 'react';
import { StateInterface } from '../../interfaces/index';
import { createClient } from 'contentful';
import postParser from '../parsers/postParser';

type ActionType = {
    type: 'LOADING' | 'COMPLETE' | 'ERROR';
};

const initialState: StateInterface = {
    response: null,
    loading: false,
    error: null,
};

const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

const contentfulReducer = (state: StateInterface, action: ActionType) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true };
        case 'COMPLETE':
            return { ...state, response: action.payload.response, loading: false };
        case 'ERROR':
            return { ...state, loading: false, error: action.payload.error };
        default:
            throw new Error('Something went wrong');
    }
};

const useContentful = (id: string): [] => {
    const [state, dispatch] = useReducer(contentfulReducer, initialState);

    useEffect(() => {
        dispatch({ type: 'LOADING' });
        if (id) {
            client
                .getEntry(id)
                .then((entry) => {
                    dispatch({ type: 'COMPLETE', payload: { response: postParser(entry) } });
                })
                .catch((error) => dispatch({ type: 'ERROR', payload: { error } }));
        }
    }, [id]);

    return [state.response, state.loading, state.error];
};

export default useContentful;
