import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External Dependencies
 */
import classnames from 'classnames';
/**
 * WordPress Dependencies
 */

import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
/**
 * Internal Dependencies
 */

import KeyboardShortcuts from '../../keyboard-shortcuts';
export default createHigherOrderComponent(function (WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
        _this.bindContainer = _this.bindContainer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.focusNextRegion = _this.focusRegion.bind(_assertThisInitialized(_assertThisInitialized(_this)), 1);
        _this.focusPreviousRegion = _this.focusRegion.bind(_assertThisInitialized(_assertThisInitialized(_this)), -1);
        _this.onClick = _this.onClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.state = {
          isFocusingRegions: false
        };
        return _this;
      }

      _createClass(_class, [{
        key: "bindContainer",
        value: function bindContainer(ref) {
          this.container = ref;
        }
      }, {
        key: "focusRegion",
        value: function focusRegion(offset) {
          var regions = _toConsumableArray(this.container.querySelectorAll('[role="region"]'));

          if (!regions.length) {
            return;
          }

          var nextRegion = regions[0];
          var selectedIndex = regions.indexOf(document.activeElement);

          if (selectedIndex !== -1) {
            var nextIndex = selectedIndex + offset;
            nextIndex = nextIndex === -1 ? regions.length - 1 : nextIndex;
            nextIndex = nextIndex === regions.length ? 0 : nextIndex;
            nextRegion = regions[nextIndex];
          }

          nextRegion.focus();
          this.setState({
            isFocusingRegions: true
          });
        }
      }, {
        key: "onClick",
        value: function onClick() {
          this.setState({
            isFocusingRegions: false
          });
        }
      }, {
        key: "render",
        value: function render() {
          var className = classnames('components-navigate-regions', {
            'is-focusing-regions': this.state.isFocusingRegions
          }); // Disable reason: Clicking the editor should dismiss the regions focus style

          /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */

          return createElement("div", {
            ref: this.bindContainer,
            className: className,
            onClick: this.onClick
          }, createElement(KeyboardShortcuts, {
            bindGlobal: true,
            shortcuts: {
              'ctrl+`': this.focusNextRegion,
              'shift+alt+n': this.focusNextRegion,
              'ctrl+shift+`': this.focusPreviousRegion,
              'shift+alt+p': this.focusPreviousRegion
            }
          }), createElement(WrappedComponent, this.props));
          /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
        }
      }]);

      return _class;
    }(Component)
  );
}, 'navigateRegions');
//# sourceMappingURL=index.js.map