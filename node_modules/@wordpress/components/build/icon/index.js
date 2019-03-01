"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _element = require("@wordpress/element");

var _ = require("../");

/**
 * WordPress dependencies
 */
function Icon(_ref) {
  var _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? null : _ref$icon,
      size = _ref.size,
      className = _ref.className;
  var iconSize;

  if ('string' === typeof icon) {
    // Dashicons should be 20x20 by default
    iconSize = size || 20;
    return (0, _element.createElement)(_.Dashicon, {
      icon: icon,
      size: iconSize,
      className: className
    });
  } // Any other icons should be 24x24 by default


  iconSize = size || 24;

  if ('function' === typeof icon) {
    if (icon.prototype instanceof _element.Component) {
      return (0, _element.createElement)(icon, {
        className: className,
        size: iconSize
      });
    }

    return icon();
  }

  if (icon && (icon.type === 'svg' || icon.type === _.SVG)) {
    var appliedProps = (0, _objectSpread2.default)({
      className: className,
      width: iconSize,
      height: iconSize
    }, icon.props);
    return (0, _element.createElement)(_.SVG, appliedProps);
  }

  if ((0, _element.isValidElement)(icon)) {
    return (0, _element.cloneElement)(icon, {
      className: className,
      size: iconSize
    });
  }

  return icon;
}

var _default = Icon;
exports.default = _default;
//# sourceMappingURL=index.js.map