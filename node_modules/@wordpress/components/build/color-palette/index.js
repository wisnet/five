"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ColorPalette;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _button = _interopRequireDefault(require("../button"));

var _dropdown = _interopRequireDefault(require("../dropdown"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _colorPicker = _interopRequireDefault(require("../color-picker"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function ColorPalette(_ref) {
  var colors = _ref.colors,
      _ref$disableCustomCol = _ref.disableCustomColors,
      disableCustomColors = _ref$disableCustomCol === void 0 ? false : _ref$disableCustomCol,
      value = _ref.value,
      onChange = _ref.onChange,
      className = _ref.className;

  function applyOrUnset(color) {
    return function () {
      return onChange(value === color ? undefined : color);
    };
  }

  var customColorPickerLabel = (0, _i18n.__)('Custom color picker');
  var classes = (0, _classnames.default)('components-color-palette', className);
  return (0, _element.createElement)("div", {
    className: classes
  }, (0, _lodash.map)(colors, function (_ref2) {
    var color = _ref2.color,
        name = _ref2.name;
    var style = {
      color: color
    };
    var itemClasses = (0, _classnames.default)('components-color-palette__item', {
      'is-active': value === color
    });
    return (0, _element.createElement)("div", {
      key: color,
      className: "components-color-palette__item-wrapper"
    }, (0, _element.createElement)(_tooltip.default, {
      text: name || // translators: %s: color hex code e.g: "#f00".
      (0, _i18n.sprintf)((0, _i18n.__)('Color code: %s'), color)
    }, (0, _element.createElement)("button", {
      type: "button",
      className: itemClasses,
      style: style,
      onClick: applyOrUnset(color),
      "aria-label": name ? // translators: %s: The name of the color e.g: "vivid red".
      (0, _i18n.sprintf)((0, _i18n.__)('Color: %s'), name) : // translators: %s: color hex code e.g: "#f00".
      (0, _i18n.sprintf)((0, _i18n.__)('Color code: %s'), color),
      "aria-pressed": value === color
    })));
  }), !disableCustomColors && (0, _element.createElement)(_dropdown.default, {
    className: "components-color-palette__item-wrapper components-color-palette__custom-color",
    contentClassName: "components-color-palette__picker",
    renderToggle: function renderToggle(_ref3) {
      var isOpen = _ref3.isOpen,
          onToggle = _ref3.onToggle;
      return (0, _element.createElement)(_tooltip.default, {
        text: customColorPickerLabel
      }, (0, _element.createElement)("button", {
        type: "button",
        "aria-expanded": isOpen,
        className: "components-color-palette__item",
        onClick: onToggle,
        "aria-label": customColorPickerLabel
      }, (0, _element.createElement)("span", {
        className: "components-color-palette__custom-color-gradient"
      })));
    },
    renderContent: function renderContent() {
      return (0, _element.createElement)(_colorPicker.default, {
        color: value,
        onChangeComplete: function onChangeComplete(color) {
          return onChange(color.hex);
        },
        disableAlpha: true
      });
    }
  }), (0, _element.createElement)(_button.default, {
    className: "components-color-palette__clear",
    type: "button",
    onClick: function onClick() {
      return onChange(undefined);
    },
    isSmall: true,
    isDefault: true
  }, (0, _i18n.__)('Clear')));
}
//# sourceMappingURL=index.js.map