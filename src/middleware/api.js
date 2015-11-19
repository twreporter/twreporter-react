import { camelizeKeys } from 'humps';
import superAgent from 'superagent';
import Promise from 'bluebird';
import _ from 'lodash';

export const CALL_API = Symbol('CALL_API');

export default store => next => action => {
    if ( ! action[CALL_API] ) {
        return next(action);
    }
    let request = action[CALL_API];
    let { getState } = store;
    let deferred = Promise.defer();
    // handle 401 and auth here
    let { method, url, types } = request;
    const [ requestType, successType, failureType ] = types;
    superAgent[method](url).timeout(200)
        .end((err, res)=> {
            if ( res && res.body._items ) {
                if (res.ok) {
                    next({
                        type: successType,
                        response: res.body._items
                    });

                    if (_.isFunction(request.afterSuccess)) {
                        request.afterSuccess({ getState });
                    }
                }
            } else {
                next({
                   type: failureType,
                   response: {}
                });
            }
            deferred.resolve();
    });
    
    return deferred.promise;
};
