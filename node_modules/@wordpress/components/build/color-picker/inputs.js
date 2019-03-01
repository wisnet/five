"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Inputs = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _a11y = require("@wordpress/a11y");

var _i18n = require("@wordpress/i18n");

var _keycodes = require("@wordpress/keycodes");

var _iconButton = _interopRequireDefault(require("../icon-button"));

var _utils = require("./utils");

var _textControl = _interopRequireDefault(require("../text-control"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/* Wrapper for TextControl, only used to handle intermediate state while typing. */
var Input =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Input, _Component);

  function Input(_ref) {
    var _this;

    var value = _ref.value;
    (0, _classCallCheck2.default)(this, Input);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Input).apply(this, arguments));
    _this.state = {
      value: String(value).toLowerCase()
    };
    _this.handleBlur = _this.handleBlur.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(Input, [{
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
      onChange((0, _defineProperty2.default)({}, valueKey, value));
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      var _this$props2 = this.props,
          valueKey = _this$props2.valueKey,
          onChange = _this$props2.onChange; // Protect against expanding a value while we're typing.

      if (value.length > 4) {
        onChange((0, _defineProperty2.default)({}, valueKey, value));
      }

      this.setState({
        value: value
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(_ref2) {
      var keyCode = _ref2.keyCode;

      if (keyCode !== _keycodes.ENTER && keyCode !== _keycodes.UP && keyCode !== _keycodes.DOWN) {
        return;
      }

      var value = this.state.value;
      var _this$props3 = this.props,
          valueKey = _this$props3.valueKey,
          onChange = _this$props3.onChange;
      onChange((0, _defineProperty2.default)({}, valueKey, value));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          label = _this$props4.label,
          props = (0, _objectWithoutProperties2.default)(_this$props4, ["label"]);
      var value = this.state.value;
      return (0, _element.createElement)(_textControl.default, (0, _extends2.default)({
        className: "components-color-picker__inputs-field",
        label: label,
        value: value,
        onChange: function onChange(newValue) {
          return _this2.handleChange(newValue);
        },
        onBlur: this.handleBlur,
        onKeyDown: this.handleKeyDown
      }, (0, _lodash.omit)(props, ['onChange', 'value', 'valueKey'])));
    }
  }]);
  return Input;
}(_element.Component);

var Inputs =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(Inputs, _Component2);

  function Inputs(_ref3) {
    var _this3;

    var hsl = _ref3.hsl;
    (0, _classCallCheck2.default)(this, Inputs);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Inputs).apply(this, arguments));
    var view = hsl.a === 1 ? 'hex' : 'rgb';
    _this3.state = {
      view: view
    };
    _this3.toggleViews = _this3.toggleViews.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)));
    _this3.handleChange = _this3.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)));
    return _this3;
  }

  (0, _createClass2.default)(Inputs, [{
    key: "toggleViews",
    value: function toggleViews() {
      if (this.state.view === 'hex') {
        this.setState({
          view: 'rgb'
        });
        (0, _a11y.speak)((0, _i18n.__)('RGB mode active'));
      } else if (this.state.view === 'rgb') {
        this.setState({
          view: 'hsl'
        });
        (0, _a11y.speak)((0, _i18n.__)('Hue/saturation/lightness mode active'));
      } else if (this.state.view === 'hsl') {
        if (this.props.hsl.a === 1) {
          this.setState({
            view: 'hex'
          });
          (0, _a11y.speak)((0, _i18n.__)('Hex color mode active'));
        } else {
          this.setState({
            view: 'rgb'
          });
          (0, _a11y.speak)((0, _i18n.__)('RGB mode active'));
        }
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(data) {
      if (data.hex) {
        if ((0, _utils.isValidHex)(data.hex)) {
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
        return (0, _element.createElement)("div", {
          className: "components-color-picker__inputs-fields"
        }, (0, _element.createElement)(Input, {
          label: (0, _i18n.__)('Color value in hexadecimal'),
          valueKey: "hex",
          value: this.props.hex,
          onChange: this.handleChange
        }));
      } else if (this.state.view === 'rgb') {
        return (0, _element.createElement)("fieldset", null, (0, _element.createElement)("legend", {
          className: "screen-reader-text"
        }, (0, _i18n.__)('Color value in RGB')), (0, _element.createElement)("div", {
          className: "components-color-picker__inputs-fields"
        }, (0, _element.createElement)(Input, {
          label: "r",
          valueKey: "r",
          value: this.props.rgb.r,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), (0, _element.createElement)(Input, {
          label: "g",
          valueKey: "g",
          value: this.props.rgb.g,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), (0, _element.createElement)(Input, {
          label: "b",
          valueKey: "b",
          value: this.props.rgb.b,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "255"
        }), disableAlpha ? null : (0, _element.createElement)(Input, {
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
        return (0, _element.createElement)("fieldset", null, (0, _element.createElement)("legend", {
          className: "screen-reader-text"
        }, (0, _i18n.__)('Color value in HSL')), (0, _element.createElement)("div", {
          className: "components-color-picker__inputs-fields"
        }, (0, _element.createElement)(Input, {
          label: "h",
          valueKey: "h",
          value: this.props.hsl.h,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "359"
        }), (0, _element.createElement)(Input, {
          label: "s",
          valueKey: "s",
          value: this.props.hsl.s,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "100"
        }), (0, _element.createElement)(Input, {
          label: "l",
          valueKey: "l",
          value: this.props.hsl.l,
          onChange: this.handleChange,
          type: "number",
          min: "0",
          max: "100"
        }), disableAlpha ? null : (0, _element.createElement)(Input, {
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
      return (0, _element.createElement)("div", {
        className: "components-color-picker__inputs-wrapper"
      }, this.renderFields(), (0, _element.createElement)("div", {
        className: "components-color-picker__inputs-toggle"
      }, (0, _element.createElement)(_iconButton.default, {
        icon: "arrow-down-alt2",
        label: (0, _i18n.__)('Change color format'),
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
}(_element.Component);

exports.Inputs = Inputs;
var _default = Inputs;
exports.default = _default;
//# sourceMappingURL=inputs.js.map