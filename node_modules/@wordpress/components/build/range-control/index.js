"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _ = require("../");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function RangeControl(_ref) {
  var className = _ref.className,
      label = _ref.label,
      value = _ref.value,
      instanceId = _ref.instanceId,
      onChange = _ref.onChange,
      beforeIcon = _ref.beforeIcon,
      afterIcon = _ref.afterIcon,
      help = _ref.help,
      allowReset = _ref.allowReset,
      initialPosition = _ref.initialPosition,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className", "label", "value", "instanceId", "onChange", "beforeIcon", "afterIcon", "help", "allowReset", "initialPosition"]);
  var id = "inspector-range-control-".concat(instanceId);

  var resetValue = function resetValue() {
    return onChange();
  };

  var onChangeValue = function onChangeValue(event) {
    var newValue = event.target.value;

    if (newValue === '') {
      resetValue();
      return;
    }

    onChange(Number(newValue));
  };

  var initialSliderValue = (0, _lodash.isFinite)(value) ? value : initialPosition || '';
  return (0, _element.createElement)(_.BaseControl, {
    label: label,
    id: id,
    help: help,
    className: (0, _classnames.default)('components-range-control', className)
  }, beforeIcon && (0, _element.createElement)(_.Dashicon, {
    icon: beforeIcon
  }), (0, _element.createElement)("input", (0, _extends2.default)({
    className: "components-range-control__slider",
    id: id,
    type: "range",
    value: initialSliderValue,
    onChange: onChangeValue,
    "aria-describedby": !!help ? id + '__help' : undefined
  }, props)), afterIcon && (0, _element.createElement)(_.Dashicon, {
    icon: afterIcon
  }), (0, _element.createElement)("input", (0, _extends2.default)({
    className: "components-range-control__number",
    type: "number",
    onChange: onChangeValue,
    "aria-label": label,
    value: value
  }, props)), allowReset && (0, _element.createElement)(_.Button, {
    onClick: resetValue,
    disabled: value === undefined
  }, (0, _i18n.__)('Reset')));
}

var _default = (0, _compose.withInstanceId)(RangeControl);

exports.default = _default;
//# sourceMappingURL=index.js.map