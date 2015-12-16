import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import superAgent from 'superagent';
import Promise from 'bluebird';
import _ from 'lodash';

export const CALL_API = Symbol('CALL_API');

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/gaearon/normalizr

const articleSchema = new Schema('articles', {
    idAttribute: 'id'
})

// Schemas for Github API responses.
export const Schemas = {
    ARTICLE: articleSchema,
    ARTICLES : arrayOf(articleSchema)
}

export default store => next => action => {
    if ( ! action[CALL_API] ) {
        return next(action);
    }
    let request = action[CALL_API];
    let { getState } = store;
    let deferred = Promise.defer();
    // handle 401 and auth here
    const { method, url, types, params, schema } = request;
    const [ requestType, successType, failureType ] = types;
    superAgent[method](url).timeout(500).send(params)
        .end((err, res)=> {
            if ( res && res.text ) {
                if (res.ok) {
                    next({
                        type: successType,
                        response: res,
                        tags: params.tags || []
                    });
                    if (_.isFunction(request.afterSuccess)) {
                        request.afterSuccess({ getState });
                    }
                }
            } else {
                next({
                   type: failureType,
                   response: {},
                    tags: params.tags || []
                });
            }
            deferred.resolve();
    });

    return deferred.promise;
};
