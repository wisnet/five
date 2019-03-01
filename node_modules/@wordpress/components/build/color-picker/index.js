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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _alpha = _interopRequireDefault(require("./alpha"));

var _hue = _interopRequireDefault(require("./hue"));

var _inputs = _interopRequireDefault(require("./inputs"));

var _saturation = _interopRequireDefault(require("./saturation"));

var _utils = require("./utils");

/**
 * Parts of this source were derived and modified from react-color,
 * released under the MIT license.
 *
 * https://github.com/casesandberg/react-color/
 *
 * Copyright (c) 2015 Case Sandberg
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var ColorPicker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ColorPicker, _Component);

  function ColorPicker(_ref) {
    var _this;

    var _ref$color = _ref.color,
        color = _ref$color === void 0 ? '0071a1' : _ref$color;
    (0, _classCallCheck2.default)(this, ColorPicker);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ColorPicker).apply(this, arguments));
    _this.state = (0, _utils.colorToState)(color);
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(ColorPicker, [{
    key: "handleChange",
    value: function handleChange(data) {
      var _this$props = this.props,
          oldHue = _this$props.oldHue,
          _this$props$onChangeC = _this$props.onChangeComplete,
          onChangeComplete = _this$props$onChangeC === void 0 ? _lodash.noop : _this$props$onChangeC;
      var isValidColor = (0, _utils.simpleCheckForValidColor)(data);

      if (isValidColor) {
        var colors = (0, _utils.colorToState)(data, data.h || oldHue);
        this.setState(colors, (0, _lodash.debounce)((0, _lodash.partial)(onChangeComplete, colors), 100));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          className = _this$props2.className,
          disableAlpha = _this$props2.disableAlpha;
      var _this$state = this.state,
          color = _this$state.color,
          hex = _this$state.hex,
          hsl = _this$state.hsl,
          hsv = _this$state.hsv,
          rgb = _this$state.rgb;
      var classes = (0, _classnames.default)(className, {
        'components-color-picker': true,
        'is-alpha-disabled': disableAlpha,
        'is-alpha-enabled': !disableAlpha
      });
      return (0, _element.createElement)("div", {
        className: classes
      }, (0, _element.createElement)("div", {
        className: "components-color-picker__saturation"
      }, (0, _element.createElement)(_saturation.default, {
        hsl: hsl,
        hsv: hsv,
        onChange: this.handleChange
      })), (0, _element.createElement)("div", {
        className: "components-color-picker__body"
      }, (0, _element.createElement)("div", {
        className: "components-color-picker__controls"
      }, (0, _element.createElement)("div", {
        className: "components-color-picker__swatch"
      }, (0, _element.createElement)("div", {
        className: "components-color-picker__active",
        style: {
          backgroundColor: color && color.toRgbString()
        }
      })), (0, _element.createElement)("div", {
        className: "components-color-picker__toggles"
      }, (0, _element.createElement)(_hue.default, {
        hsl: hsl,
        onChange: this.handleChange
      }), disableAlpha ? null : (0, _element.createElement)(_alpha.default, {
        rgb: rgb,
        hsl: hsl,
        onChange: this.handleChange
      }))), (0, _element.createElement)(_inputs.default, {
        rgb: rgb,
        hsl: hsl,
        hex: hex,
        onChange: this.handleChange,
        disableAlpha: disableAlpha
      })));
    }
  }]);
  return ColorPicker;
}(_element.Component);

exports.default = ColorPicker;
//# sourceMappingURL=index.js.map