"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _hooks = require("@wordpress/hooks");

/**
 * External dependencies
 */
var createNonceMiddleware = function createNonceMiddleware(nonce) {
  var usedNonce = nonce;
  /**
   * This is not ideal but it's fine for now.
   *
   * Configure heartbeat to refresh the wp-api nonce, keeping the editor
   * authorization intact.
   */

  (0, _hooks.addAction)('heartbeat.tick', 'core/api-fetch/create-nonce-middleware', function (response) {
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
      headers = (0, _objectSpread2.default)({}, headers, {
        'X-WP-Nonce': usedNonce
      });
    }

    return next((0, _objectSpread2.default)({}, options, {
      headers: headers
    }));
  };
};

var _default = createNonceMiddleware;
exports.default = _default;
//# sourceMappingURL=nonce.js.map