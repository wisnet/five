import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

/**
 * External dependencies
 */
import { get } from 'lodash';
/**
 * creates a middleware handling resolvers cache invalidation.
 *
 * @param {Object} registry
 * @param {string} reducerKey
 *
 * @return {function} middleware
 */

var createResolversCacheMiddleware = function createResolversCacheMiddleware(registry, reducerKey) {
  return function () {
    return function (next) {
      return function (action) {
        var resolvers = registry.select('core/data').getCachedResolvers(reducerKey);
        Object.entries(resolvers).forEach(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              selectorName = _ref2[0],
              resolversByArgs = _ref2[1];

          var resolver = get(registry.namespaces, [reducerKey, 'resolvers', selectorName]);

          if (!resolver || !resolver.shouldInvalidate) {
            return;
          }

          resolversByArgs.forEach(function (value, args) {
            // resolversByArgs is the map Map([ args ] => boolean) storing the cache resolution status for a given selector.
            // If the value is false it means this resolver has finished its resolution which means we need to invalidate it,
            // if it's true it means it's inflight and the invalidation is not necessary.
            if (value !== false || !resolver.shouldInvalidate.apply(resolver, [action].concat(_toConsumableArray(args)))) {
              return;
            } // Trigger cache invalidation


            registry.dispatch('core/data').invalidateResolution(reducerKey, selectorName, args);
          });
        });
        next(action);
      };
    };
  };
};

export default createResolversCacheMiddleware;
//# sourceMappingURL=resolvers-cache-middleware.js.map