import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import createNonceMiddleware from './middlewares/nonce';
import createRootURLMiddleware from './middlewares/root-url';
import createPreloadingMiddleware from './middlewares/preloading';
import fetchAllMiddleware from './middlewares/fetch-all-middleware';
import namespaceEndpointMiddleware from './middlewares/namespace-endpoint';
import httpV1Middleware from './middlewares/http-v1';
import userLocaleMiddleware from './middlewares/user-locale';
/**
 * Default set of header values which should be sent with every request unless
 * explicitly provided through apiFetch options.
 *
 * @type {Object}
 */

var DEFAULT_HEADERS = {
  // The backend uses the Accept header as a condition for considering an
  // incoming request as a REST request.
  //
  // See: https://core.trac.wordpress.org/ticket/44534
  Accept: 'application/json, */*;q=0.1'
};
/**
 * Default set of fetch option values which should be sent with every request
 * unless explicitly provided through apiFetch options.
 *
 * @type {Object}
 */

var DEFAULT_OPTIONS = {
  credentials: 'include'
};
var middlewares = [];

function registerMiddleware(middleware) {
  middlewares.push(middleware);
}

function apiFetch(options) {
  var raw = function raw(nextOptions) {
    var url = nextOptions.url,
        path = nextOptions.path,
        data = nextOptions.data,
        _nextOptions$parse = nextOptions.parse,
        parse = _nextOptions$parse === void 0 ? true : _nextOptions$parse,
        remainingOptions = _objectWithoutProperties(nextOptions, ["url", "path", "data", "parse"]);

    var body = nextOptions.body,
        headers = nextOptions.headers; // Merge explicitly-provided headers with default values.

    headers = _objectSpread({}, DEFAULT_HEADERS, headers); // The `data` property is a shorthand for sending a JSON body.

    if (data) {
      body = JSON.stringify(data);
      headers['Content-Type'] = 'application/json';
    }

    var responsePromise = window.fetch(url || path, _objectSpread({}, DEFAULT_OPTIONS, remainingOptions, {
      body: body,
      headers: headers
    }));

    var checkStatus = function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }

      throw response;
    };

    var parseResponse = function parseResponse(response) {
      if (parse) {
        if (response.status === 204) {
          return null;
        }

        return response.json ? response.json() : Promise.reject(response);
      }

      return response;
    };

    return responsePromise.then(checkStatus).then(parseResponse).catch(function (response) {
      if (!parse) {
        throw response;
      }

      var invalidJsonError = {
        code: 'invalid_json',
        message: __('The response is not a valid JSON response.')
      };

      if (!response || !response.json) {
        throw invalidJsonError;
      }

      return response.json().catch(function () {
        throw invalidJsonError;
      }).then(function (error) {
        var unknownError = {
          code: 'unknown_error',
          message: __('An unknown error occurred.')
        };
        throw error || unknownError;
      });
    });
  };

  var steps = [raw, fetchAllMiddleware, httpV1Middleware, namespaceEndpointMiddleware, userLocaleMiddleware].concat(middlewares).reverse();

  var runMiddleware = function runMiddleware(index) {
    return function (nextOptions) {
      var nextMiddleware = steps[index];
      var next = runMiddleware(index + 1);
      return nextMiddleware(nextOptions, next);
    };
  };

  return runMiddleware(0)(options);
}

apiFetch.use = registerMiddleware;
apiFetch.createNonceMiddleware = createNonceMiddleware;
apiFetch.createPreloadingMiddleware = createPreloadingMiddleware;
apiFetch.createRootURLMiddleware = createRootURLMiddleware;
apiFetch.fetchAllMiddleware = fetchAllMiddleware;
export default apiFetch;
//# sourceMappingURL=index.js.map