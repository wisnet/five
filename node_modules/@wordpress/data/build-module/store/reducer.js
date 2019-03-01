/**
 * External dependencies
 */
import { flowRight } from 'lodash';
import EquivalentKeyMap from 'equivalent-key-map';
/**
 * Internal dependencies
 */

import { onSubKey } from './utils';
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

var isResolved = flowRight([onSubKey('reducerKey'), onSubKey('selectorName')])(function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new EquivalentKeyMap();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'START_RESOLUTION':
    case 'FINISH_RESOLUTION':
      {
        var isStarting = action.type === 'START_RESOLUTION';
        var nextState = new EquivalentKeyMap(state);
        nextState.set(action.args, isStarting);
        return nextState;
      }

    case 'INVALIDATE_RESOLUTION':
      {
        var _nextState = new EquivalentKeyMap(state);

        _nextState.delete(action.args);

        return _nextState;
      }
  }

  return state;
});
export default isResolved;
//# sourceMappingURL=reducer.js.map