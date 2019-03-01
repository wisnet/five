"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var _equivalentKeyMap = _interopRequireDefault(require("equivalent-key-map"));

var _utils = require("./utils");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Reducer function returning next state for selector resolution, object form:
 *
 *  reducerKey -> selectorName -> EquivalentKeyMap<Array,boolean>
 *
 * @param {Object} state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @returns {Object} Next state.
 */
var isResolved = (0, _lodash.flowRight)([(0, _utils.onSubKey)('reducerKey'), (0, _utils.onSubKey)('selectorName')])(function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _equivalentKeyMap.default();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'START_RESOLUTION':
    case 'FINISH_RESOLUTION':
      {
        var isStarting = action.type === 'START_RESOLUTION';
        var nextState = new _equivalentKeyMap.default(state);
        nextState.set(action.args, isStarting);
        return nextState;
      }

    case 'INVALIDATE_RESOLUTION':
      {
        var _nextState = new _equivalentKeyMap.default(state);

        _nextState.delete(action.args);

        return _nextState;
      }
  }

  return state;
});
var _default = isResolved;
exports.default = _default;
//# sourceMappingURL=reducer.js.map