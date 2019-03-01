import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { debounce, uniqueId } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { addAction, applyFilters, removeAction } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
var ANIMATION_FRAME_PERIOD = 16;
/**
 * Creates a higher-order component which adds filtering capability to the
 * wrapped component. Filters get applied when the original component is about
 * to be mounted. When a filter is added or removed that matches the hook name,
 * the wrapped component re-renders.
 *
 * @param {string} hookName Hook name exposed to be used by filters.
 *
 * @return {Function} Higher-order component factory.
 */

export default function withFilters(hookName) {
  return createHigherOrderComponent(function (OriginalComponent) {
    return (
      /*#__PURE__*/
      function (_Component) {
        _inherits(FilteredComponent, _Component);

        /** @inheritdoc */
        function FilteredComponent(props) {
          var _this;

          _classCallCheck(this, FilteredComponent);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(FilteredComponent).call(this, props));
          _this.onHooksUpdated = _this.onHooksUpdated.bind(_assertThisInitialized(_assertThisInitialized(_this)));
          _this.Component = applyFilters(hookName, OriginalComponent);
          _this.namespace = uniqueId('core/with-filters/component-');
          _this.throttledForceUpdate = debounce(function () {
            _this.Component = applyFilters(hookName, OriginalComponent);

            _this.forceUpdate();
          }, ANIMATION_FRAME_PERIOD);
          addAction('hookRemoved', _this.namespace, _this.onHooksUpdated);
          addAction('hookAdded', _this.namespace, _this.onHooksUpdated);
          return _this;
        }
        /** @inheritdoc */


        _createClass(FilteredComponent, [{
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            this.throttledForceUpdate.cancel();
            removeAction('hookRemoved', this.namespace);
            removeAction('hookAdded', this.namespace);
          }
          /**
           * When a filter is added or removed for the matching hook name, the wrapped component should re-render.
           *
           * @param {string} updatedHookName  Name of the hook that was updated.
           */

        }, {
          key: "onHooksUpdated",
          value: function onHooksUpdated(updatedHookName) {
            if (updatedHookName === hookName) {
              this.throttledForceUpdate();
            }
          }
          /** @inheritdoc */

        }, {
          key: "render",
          value: function render() {
            return createElement(this.Component, this.props);
          }
        }]);

        return FilteredComponent;
      }(Component)
    );
  }, 'withFilters');
}
//# sourceMappingURL=index.js.map