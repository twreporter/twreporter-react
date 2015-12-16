import * as ActionType from '../actions/articles';
import { camelizeKeys } from 'humps';

function taggedArticles(state = {}, action) {
    switch (action.type) {
        case ActionType.LOADED_TAGGED_ARTICLES_SUCCESS:
            if (action.response && action.response.text) {
                let response = JSON.parse(action.response.text);
                let results = response.results;
                let tags = action.tags || [];
                for (var i = 0; i < tags.length; i++) {
                    let tag = tags[i];
                    let camelizedJson = camelizeKeys(results[i]._items);
                    state[tags[i]] = camelizedJson;
                }
            }
            return state;
        case ActionType.LOADED_TAGGED_ARTICLES_FAILURE:
            return state;
        default:
            return state;
    }
}

function articles (state = {}, action) {
    switch(action.type) {
        case ActionType.LOADED_TAGGED_ARTICLES_SUCCESS:
            return taggedArticles(state, action);
        case ActionType.LOADED_TAGGED_ARTICLES_FAILURE:
            return {};
        default:
            return state;
    }
}

export default articles;
