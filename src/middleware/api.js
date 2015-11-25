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
    let { method, url, types, params } = request;
    const [ requestType, successType, failureType ] = types;
    superAgent[method](url).timeout(200).send(params)
        .end((err, res)=> {
            if ( res && res.text ) {
                if (res.ok) {
                    let response = JSON.parse(res.text)
                    let r = response.results
                    let results = {}
                    for (var i = 0; i < params.tags.length; i++) {
                        let tag = params.tags[i]
                        results[params.tags[i]] = r[i]._items
                    }
                    next({
                        type: successType,
                        response: results
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
