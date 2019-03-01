"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = withFilters;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _hooks = require("@wordpress/hooks");

var _compose = require("@wordpress/compose");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
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

function withFilters(hookName) {
  return (0, _compose.createHigherOrderComponent)(function (OriginalComponent) {
    return (
      /*#__PURE__*/
      function (_Component) {
        (0, _inherits2.default)(FilteredComponent, _Component);

        /** @inheritdoc */
        function FilteredComponent(props) {
          var _this;

          (0, _classCallCheck2.default)(this, FilteredComponent);
          _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FilteredComponent).call(this, props));
          _this.onHooksUpdated = _this.onHooksUpdated.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
          _this.Component = (0, _hooks.applyFilters)(hookName, OriginalComponent);
          _this.namespace = (0, _lodash.uniqueId)('core/with-filters/component-');
          _this.throttledForceUpdate = (0, _lodash.debounce)(function () {
            _this.Component = (0, _hooks.applyFilters)(hookName, OriginalComponent);

            _this.forceUpdate();
          }, ANIMATION_FRAME_PERIOD);
          (0, _hooks.addAction)('hookRemoved', _this.namespace, _this.onHooksUpdated);
          (0, _hooks.addAction)('hookAdded', _this.namespace, _this.onHooksUpdated);
          return _this;
        }
        /** @inheritdoc */


        (0, _createClass2.default)(FilteredComponent, [{
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            this.throttledForceUpdate.cancel();
            (0, _hooks.removeAction)('hookRemoved', this.namespace);
            (0, _hooks.removeAction)('hookAdded', this.namespace);
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
            return (0, _element.createElement)(this.Component, this.props);
          }
        }]);
        return FilteredComponent;
      }(_element.Component)
    );
  }, 'withFilters');
}
//# sourceMappingURL=index.js.map