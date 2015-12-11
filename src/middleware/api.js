import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import superAgent from 'superagent';
import Promise from 'bluebird';
import _ from 'lodash';

export const CALL_API = Symbol('CALL_API');

function parseAPIResponse(response, schema) {
}

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
                    let parsedResults = parseAPIResponse(response, schema);
                    let response = JSON.parse(res.text);
                    let r = response.results;
                    let results = {};
                    for (var i = 0; i < params.tags.length; i++) {
                        let tag = params.tags[i];
                        let camelizedJson = camelizeKeys(r[i]._items);
                        results[params.tags[i]] = camelizedJson;
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
