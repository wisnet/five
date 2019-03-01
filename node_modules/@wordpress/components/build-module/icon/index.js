import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";

/**
 * WordPress dependencies
 */
import { cloneElement, createElement, Component, isValidElement } from '@wordpress/element';
import { Dashicon, SVG } from '../';

function Icon(_ref) {
  var _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? null : _ref$icon,
      size = _ref.size,
      className = _ref.className;
  var iconSize;

  if ('string' === typeof icon) {
    // Dashicons should be 20x20 by default
    iconSize = size || 20;
    return createElement(Dashicon, {
      icon: icon,
      size: iconSize,
      className: className
    });
  } // Any other icons should be 24x24 by default


  iconSize = size || 24;

  if ('function' === typeof icon) {
    if (icon.prototype instanceof Component) {
      return createElement(icon, {
        className: className,
        size: iconSize
      });
    }

    return icon();
  }

  if (icon && (icon.type === 'svg' || icon.type === SVG)) {
    var appliedProps = _objectSpread({
      className: className,
      width: iconSize,
      height: iconSize
    }, icon.props);

    return createElement(SVG, appliedProps);
  }

  if (isValidElement(icon)) {
    return cloneElement(icon, {
      className: className,
      size: iconSize
    });
  }

  return icon;
}

export default Icon;
//# sourceMappingURL=index.js.map