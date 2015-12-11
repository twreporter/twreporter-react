import * as ActionType from '../actions/articles';

function articles (state = [], action) {
    switch(action.type) {
        case ActionType.LOADED_SUCCESS:
            return action.response;
            break;
        case ActionType.LOADED_FAILURE:
            return [];
            break;
        default:
            return state;
    }
}

export default articlesReducer;
