import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isString } from 'lodash';
/**
 * WordPress dependencies
 */

import { createElement, cloneElement } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import Button from '../button';
import Shortcut from '../shortcut';
import IconButton from '../icon-button';
/**
 * Renders a generic menu item for use inside the more menu.
 *
 * @return {WPElement} More menu item.
 */

export function MenuItem(_ref) {
  var children = _ref.children,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? children : _ref$label,
      info = _ref.info,
      className = _ref.className,
      icon = _ref.icon,
      shortcut = _ref.shortcut,
      isSelected = _ref.isSelected,
      _ref$role = _ref.role,
      role = _ref$role === void 0 ? 'menuitem' : _ref$role,
      instanceId = _ref.instanceId,
      props = _objectWithoutProperties(_ref, ["children", "label", "info", "className", "icon", "shortcut", "isSelected", "role", "instanceId"]);

  className = classnames('components-menu-item__button', className, {
    'has-icon': icon
  }); // Avoid using label if it is passed as non-string children.

  label = isString(label) ? label : undefined;

  if (info) {
    var infoId = 'edit-post-feature-toggle__info-' + instanceId; // Deconstructed props is scoped to the function; mutation is fine.

    props['aria-describedby'] = infoId;
    children = createElement("span", {
      className: "components-menu-item__info-wrapper"
    }, children, createElement("span", {
      id: infoId,
      className: "components-menu-item__info"
    }, info));
  }

  var tagName = Button;

  if (icon) {
    if (!isString(icon)) {
      icon = cloneElement(icon, {
        className: 'components-menu-items__item-icon',
        height: 20,
        width: 20
      });
    }

    tagName = IconButton;
    props.icon = icon;
  }

  return createElement(tagName, _objectSpread({
    'aria-label': label,
    // Make sure aria-checked matches spec https://www.w3.org/TR/wai-aria-1.1/#aria-checked
    'aria-checked': role === 'menuitemcheckbox' || role === 'menuitemradio' ? isSelected : undefined,
    role: role,
    className: className
  }, props), children, createElement(Shortcut, {
    className: "components-menu-item__shortcut",
    shortcut: shortcut
  }));
}
export default withInstanceId(MenuItem);
//# sourceMappingURL=index.js.map