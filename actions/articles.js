import Promise from 'bluebird';
import { CALL_API } from '../middleware/api';

export const LOADED_ARTICLES = 'LOADED_ARTICLES';
export function loadArticles() {
    return {
        [CALL_API]: {
            method: 'get',
                url: 'http://api.reportr.news/article',
                successType: LOADED_ARTICLES
        }
    };
}
