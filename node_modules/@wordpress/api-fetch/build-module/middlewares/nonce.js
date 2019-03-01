import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * External dependencies
 */
import { addAction } from '@wordpress/hooks';

var createNonceMiddleware = function createNonceMiddleware(nonce) {
  var usedNonce = nonce;
  /**
   * This is not ideal but it's fine for now.
   *
   * Configure heartbeat to refresh the wp-api nonce, keeping the editor
   * authorization intact.
   */

  addAction('heartbeat.tick', 'core/api-fetch/create-nonce-middleware', function (response) {
    if (response['rest-nonce']) {
      usedNonce = response['rest-nonce'];
    }
  });
  return function (options, next) {
    var headers = options.headers || {}; // If an 'X-WP-Nonce' header (or any case-insensitive variation
    // thereof) was specified, no need to add a nonce header.

    var addNonceHeader = true;

    for (var headerName in headers) {
      if (headers.hasOwnProperty(headerName)) {
        if (headerName.toLowerCase() === 'x-wp-nonce') {
          addNonceHeader = false;
          break;
        }
      }
    }

    if (addNonceHeader) {
      // Do not mutate the original headers object, if any.
      headers = _objectSpread({}, headers, {
        'X-WP-Nonce': usedNonce
      });
    }

    return next(_objectSpread({}, options, {
      headers: headers
    }));
  };
};

export default createNonceMiddleware;
//# sourceMappingURL=nonce.js.map