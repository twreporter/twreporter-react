import Promise from 'bluebird';
import { CALL_API } from '../middleware/api';

export const LOADED_ARTICLES_REQUEST = 'LOADED_ARTICLES_REQUEST';
export const LOADED_SUCCESS = 'LOADED_SUCCESS';
export const LOADED_FAILURE = 'LOADED_FAILURE';
function fetchArticles(tags) {
    let ext = ''
    if (tags) {
        if (typeof(tags) == 'string') {
            ext = '?where={"tags":"' + tags + '"}';
        } else if (typeof(tags) == 'Array') {
        }
    }
    return {
        [CALL_API]: {
            method: 'get',
            url: 'http://api.reportr.news/article' + ext ,
            types: ['LOADED_ARTICLES_REQUEST', 'LOADED_SUCCESS', 'LOADED_FAILURE']
        }
    };
}

export function loadArticles(tags) {
    return (dispatch, getState) => {
        return dispatch(fetchArticles(tags))
    }
}
