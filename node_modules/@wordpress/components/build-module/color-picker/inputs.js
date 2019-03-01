import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
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
import { omit } from 'lodash';
/**
 * WordPress dependencies
 */

import { speak } from '@wordpress/a11y';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { DOWN, ENTER, UP } from '@wordpress/keycodes';
/**
 * Internal dependencies
 */

import IconButton from '../icon-button';
import { isValidHex } from './utils';
import TextControl from '../text-control';
/* Wrapper for TextControl, only used to handle intermediate state while typing. */

var Input =
/*#__PURE__*/
function (_Component) {
  _inherits(Input, _Component);

  function Input(_ref) {
    var _this;

    var value = _ref.value;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).apply(this, arguments));
    _this.state = {
      value: String(value).toLowerCase()
    };
    _this.handleBlur = _this.handleBlur.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Input, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          value: String(nextProps.value).toLowerCase()
        });
      }
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      var _this$props = this.props,
          valueKey = _this$props.valueKey,
          onChange = _this$props.onChange;
      var value = this.state.value;
      onChange(_defineProperty({}, valueKey, value));
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props2 = this.props,
          valueKey = _this$props2.valueKey,
          onChange = _this$props2.onChange; // Protect against expanding a value while we're typing.

      if (value.length > 4) {
        onChange(_defineProperty({}, valueKey, value));
      }

      this.setState({
        value: value
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(_ref2) {
      var keyCode = _ref2.keyCode;

      if (keyCode !== ENTER && keyCode !== UP && keyCode !== DOWN) {
        return;
      }

      var value = this.state.value;
      var _this$props3 = this.props,
          valueKey = _this$props3.valueKey,
          onChange = _this$props3.onChange;
      onChange(_defineProperty({}, valueKey, value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          label = _this$props4.label,
          props = _objectWithoutProperties(_this$props4, ["label"]);

      var value = this.state.value;
      return createElement(TextControl, _extends({
        className: "components-color-picker__inputs-field",
        label: label,
        value: value,
        onChange: function onChange(newValue) {
          return _this2.handleChange(newValue);
        },
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown
      }, omit(props, ['onChange', 'value', 'valueKey'])));
    }
  }]);

  return Input;
}(Component);

export var Inputs =
/*#__PURE__*/
function (_Component2) {
  _inherits(Inputs, _Component2);

  function Inputs(_ref3) {
    var _this3;

    var hsl = _ref3.hsl;

    _classCallCheck(this, Inputs);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Inputs).apply(this, arguments));
    var view = hsl.a === 1 ? 'hex' : 'rgb';
    _this3.state = {
      view: view
    };
    _this3.toggleViews = _this3.toggleViews.bind(_assertThisInitialized(_assertThisInitialized(_this3)));
    _this3.handleChange = _this3.handleChange.bind(_assertThisInitialized(_assertThisInitialized(_this3)));
    return _this3;
  }

  _createClass(Inputs, [{
    key: "toggleViews",
    value: function toggleViews() {
      if (this.state.view === 'hex') {
        this.setState({
          view: 'rgb'
        });
        speak(__('RGB mode active'));
      } else if (this.state.view === 'rgb') {
        this.setState({
          view: 'hsl'
        });
        speak(__('Hue/saturation/lightness mode active'));
      } else if (this.state.view === 'hsl') {
        if (this.props.hsl.a === 1) {
          this.setState({
            view: 'hex'
          });
          speak(__('Hex color mode active'));
        } else {
          this.setState({
            view: 'rgb'
          });
          speak(__('RGB mode active'));
        }
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(data) {
      if (data.hex) {
        if (isValidHex(data.hex)) {
          this.props.onChange({
            hex: data.hex,
            source: 'hex'
          });
        }
      } else if (data.r || data.g || data.b) {
        this.props.onChange({
          r: data.r || this.props.rgb.r,
          g: data.g || this.props.rgb.g,
          b: data.b || this.props.rgb.b,
          source: 'rgb'
        });
      } else if (data.a) {
        if (data.a < 0) {
          data.a = 0;
        } else if (data.a > 1) {
          data.a = 1;
        }

        this.props.onChange({
          h: this.props.hsl.h,
          s: this.props.hsl.s,
          l: this.props.hsl.l,
          a: Math.round(data.a * 100) / 100,
          source: 'rgb'
        });
      } else if (data.h || data.s || data.l) {
        this.props.onChange({
          h: data.h || this.props.hsl.h,
          s: data.s || this.props.hsl.s,
          l: data.l || this.props.hsl.l,
          source: 'hsl'
        });
      }
    }
  }, {
    key: "renderFields",
    value: function renderFields() {
      var _this$props$disableAl = this.props.disableAlpha,
          disableAlpha = _this$props$disableAl === void 0 ? false : _this$props$disableAl;

      if (this.state.view === 'hex') {
        return createElement("div", {
          className: "components-color-picker__inputs-fields"
        }, createElement(Input, {
          label: __('Color value in hexadecimal'),
          valueKey: "hex",
          value: this.props.hex,
          onChange: this.handleChange
        }));
      } else if (this.state.view === 'rgb') {
        return createElement("fieldset", null, createElement("legend", {
          className: "screen-reader-text"
        }, __('Color value in RGB')), createElement("div", {
          className: "components-color-picker__inputs-fields"
        }, createElement(Input, {
          label: "r",
          valueKey: "r",
          value: this.props.rgb.r,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), createElement(Input, {
          label: "g",
          valueKey: "g",
          value: this.props.rgb.g,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), createElement(Input, {
          label: "b",
          valueKey: "b",
          value: this.props.rgb.b,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), disableAlpha ? null : createElement(Input, {
          label: "a",
          valueKey: "a",
          value: this.props.rgb.a,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "1",
          step: "0.05"
        })));
      } else if (this.state.view === 'hsl') {
        return createElement("fieldset", null, createElement("legend", {
          className: "screen-reader-text"
        }, __('Color value in HSL')), createElement("div", {
          className: "components-color-picker__inputs-fields"
        }, createElement(Input, {
          label: "h",
          valueKey: "h",
          value: this.props.hsl.h,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "359"
        }), createElement(Input, {
          label: "s",
          valueKey: "s",
          value: this.props.hsl.s,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "100"
        }), createElement(Input, {
          label: "l",
          valueKey: "l",
          value: this.props.hsl.l,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "100"
        }), disableAlpha ? null : createElement(Input, {
          label: "a",
          valueKey: "a",
          value: this.props.hsl.a,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "1",
          step: "0.05"
        })));
      }
    }
  }, {
    key: "render",
    value: function render() {
      return createElement("div", {
        className: "components-color-picker__inputs-wrapper"
      }, this.renderFields(), createElement("div", {
        className: "components-color-picker__inputs-toggle"
      }, createElement(IconButton, {
        icon: "arrow-down-alt2",
        label: __('Change color format'),
        onClick: this.toggleViews
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      if (props.hsl.a !== 1 && state.view === 'hex') {
        return {
          view: 'rgb'
        };
      }

      return null;
    }
  }]);

  return Inputs;
}(Component);
export default Inputs;
//# sourceMappingURL=inputs.js.map