import Promise from 'bluebird';
import { CALL_API } from '../middleware/api';

export const LOADED_ARTICLES = 'LOADED_ARTICLES';
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
                successType: LOADED_ARTICLES
        }
    };
}

export function loadArticles(tags) {
    return (dispatch, getState) => {
        return dispatch(fetchArticles(tags))
    }
}
