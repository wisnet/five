"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _compose = require("@wordpress/compose");

/**
 * WordPress dependencies
 */

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
var _default = (0, _compose.createHigherOrderComponent)(function (WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(_class, _Component);

      function _class() {
        var _this;

        (0, _classCallCheck2.default)(this, _class);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));

        _this.setIsFocusedTrue = function () {
          return _this.isFocused = true;
        };

        _this.setIsFocusedFalse = function () {
          return _this.isFocused = false;
        };

        _this.activeElementOnMount = document.activeElement;
        return _this;
      }

      (0, _createClass2.default)(_class, [{
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
          return (0, _element.createElement)("div", {
            onFocus: this.setIsFocusedTrue,
            onBlur: this.setIsFocusedFalse
          }, (0, _element.createElement)(WrappedComponent, this.props));
        }
      }]);
      return _class;
    }(_element.Component)
  );
}, 'withFocusReturn');

exports.default = _default;
//# sourceMappingURL=index.js.map