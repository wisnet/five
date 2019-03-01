/**
 * External dependencies
 */
import { applyMiddleware } from 'redux';
/**
 * WordPress dependencies
 */

import createMiddleware from '@wordpress/redux-routine';
export default function (registry) {
  return {
    registerStore: function registerStore(reducerKey, options) {
      var store = registry.registerStore(reducerKey, options);

      if (options.controls) {
        var middleware = createMiddleware(options.controls);
        var enhancer = applyMiddleware(middleware);

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