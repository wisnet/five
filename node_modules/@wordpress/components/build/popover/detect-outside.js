"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactClickOutside = _interopRequireDefault(require("react-click-outside"));

var _element = require("@wordpress/element");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var PopoverDetectOutside =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PopoverDetectOutside, _Component);

  function PopoverDetectOutside() {
    (0, _classCallCheck2.default)(this, PopoverDetectOutside);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PopoverDetectOutside).apply(this, arguments));
  }

  (0, _createClass2.default)(PopoverDetectOutside, [{
    key: "handleClickOutside",
    value: function handleClickOutside(event) {
      var onClickOutside = this.props.onClickOutside;

      if (onClickOutside) {
        onClickOutside(event);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return PopoverDetectOutside;
}(_element.Component);

var _default = (0, _reactClickOutside.default)(PopoverDetectOutside);

exports.default = _default;
//# sourceMappingURL=detect-outside.js.map