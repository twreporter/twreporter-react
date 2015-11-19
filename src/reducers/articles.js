import * as ActionType from '../actions/articles';

function articlesReducer (state = [], action) {
    switch(action.type) {
        case ActionType.LOADED_SUCCESS:
            console.log("dispatched");
            return action.response;
            break;
        case ActionType.LOADED_FAILURE:
            console.log("fetch error");
            return [];
            break;    
        default:
            return state;
    }
}

export default articlesReducer;
