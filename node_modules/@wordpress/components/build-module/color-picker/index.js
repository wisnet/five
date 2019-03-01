import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

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
import classnames from 'classnames';
import { debounce, noop, partial } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Alpha from './alpha';
import Hue from './hue';
import Inputs from './inputs';
import Saturation from './saturation';
import { colorToState, simpleCheckForValidColor } from './utils';

var ColorPicker =
/*#__PURE__*/
function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker(_ref) {
    var _this;

    var _ref$color = _ref.color,
        color = _ref$color === void 0 ? '0071a1' : _ref$color;

    _classCallCheck(this, ColorPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColorPicker).apply(this, arguments));
    _this.state = colorToState(color);
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(ColorPicker, [{
    key: "handleChange",
    value: function handleChange(data) {
      var _this$props = this.props,
          oldHue = _this$props.oldHue,
          _this$props$onChangeC = _this$props.onChangeComplete,
          onChangeComplete = _this$props$onChangeC === void 0 ? noop : _this$props$onChangeC;
      var isValidColor = simpleCheckForValidColor(data);

      if (isValidColor) {
        var colors = colorToState(data, data.h || oldHue);
        this.setState(colors, debounce(partial(onChangeComplete, colors), 100));
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
      var classes = classnames(className, {
        'components-color-picker': true,
        'is-alpha-disabled': disableAlpha,
        'is-alpha-enabled': !disableAlpha
      });
      return createElement("div", {
        className: classes
      }, createElement("div", {
        className: "components-color-picker__saturation"
      }, createElement(Saturation, {
        hsl: hsl,
        hsv: hsv,
        onChange: this.handleChange
      })), createElement("div", {
        className: "components-color-picker__body"
      }, createElement("div", {
        className: "components-color-picker__controls"
      }, createElement("div", {
        className: "components-color-picker__swatch"
      }, createElement("div", {
        className: "components-color-picker__active",
        style: {
          backgroundColor: color && color.toRgbString()
        }
      })), createElement("div", {
        className: "components-color-picker__toggles"
      }, createElement(Hue, {
        hsl: hsl,
        onChange: this.handleChange
      }), disableAlpha ? null : createElement(Alpha, {
        rgb: rgb,
        hsl: hsl,
        onChange: this.handleChange
      }))), createElement(Inputs, {
        rgb: rgb,
        hsl: hsl,
        hex: hex,
        onChange: this.handleChange,
        disableAlpha: disableAlpha
      })));
    }
  }]);

  return ColorPicker;
}(Component);

export { ColorPicker as default };
//# sourceMappingURL=index.js.map