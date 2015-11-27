import Promise from 'bluebird';
import { CALL_API } from '../middleware/api';

export const LOADED_ARTICLES_REQUEST = 'LOADED_ARTICLES_REQUEST';
export const LOADED_SUCCESS = 'LOADED_SUCCESS';
export const LOADED_FAILURE = 'LOADED_FAILURE';
function fetchArticles(tags) {
    let ext = ''
    let params = ''
    if (tags) {
        if (Array.isArray(tags)) {
            params = {'tags': tags}
        } else {
            params = {'tags': [tags] };
        }
    }
    return {
        [CALL_API]: {
            method: 'post',
            url: 'http://api.reportr.news/tags',
            params: params,
            types: [LOADED_ARTICLES_REQUEST, LOADED_SUCCESS, LOADED_FAILURE]
        }
    };
}

export function loadArticles(tags) {
    return (dispatch, getState) => {
        return dispatch(fetchArticles(tags))
    }
}
