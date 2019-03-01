import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
/**
 * Higher Order Component used to be used to wrap disposable elements like
 * sidebars, modals, dropdowns. When mounting the wrapped component, we track a
 * reference to the current active element so we know where to restore focus
 * when the component is unmounted.
 *
 * @param {WPElement} WrappedComponent The disposable component.
 *
 * @return {Component} Component with the focus restauration behaviour.
 */

export default createHigherOrderComponent(function (WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_Component) {
      _inherits(_class, _Component);

      function _class() {
        var _this;

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));

        _this.setIsFocusedTrue = function () {
          return _this.isFocused = true;
        };

        _this.setIsFocusedFalse = function () {
          return _this.isFocused = false;
        };

        _this.activeElementOnMount = document.activeElement;
        return _this;
      }

      _createClass(_class, [{
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          var activeElementOnMount = this.activeElementOnMount,
              isFocused = this.isFocused;

          if (!activeElementOnMount) {
            return;
          }

          var _document = document,
              body = _document.body,
              activeElement = _document.activeElement;

          if (isFocused || null === activeElement || body === activeElement) {
            activeElementOnMount.focus();
          }
        }
      }, {
        key: "render",
        value: function render() {
          return createElement("div", {
            onFocus: this.setIsFocusedTrue,
            onBlur: this.setIsFocusedFalse
          }, createElement(WrappedComponent, this.props));
        }
      }]);

      return _class;
    }(Component)
  );
}, 'withFocusReturn');
//# sourceMappingURL=index.js.map