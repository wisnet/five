"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _redux = require("redux");

var _reduxRoutine = _interopRequireDefault(require("@wordpress/redux-routine"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function _default(registry) {
  return {
    registerStore: function registerStore(reducerKey, options) {
      var store = registry.registerStore(reducerKey, options);

      if (options.controls) {
        var middleware = (0, _reduxRoutine.default)(options.controls);
        var enhancer = (0, _redux.applyMiddleware)(middleware);

        var createStore = function createStore() {
          return store;
        };

        Object.assign(store, enhancer(createStore)(options.reducer));
        registry.namespaces[reducerKey].supportControls = true;
      }

      return store;
    }
  };
}
//# sourceMappingURL=index.js.map