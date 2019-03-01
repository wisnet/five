import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { flatMap } from 'lodash';
/**
 * WordPress dependencies
 */

import { DOWN } from '@wordpress/keycodes';
/**
 * Internal dependencies
 */

import IconButton from '../icon-button';
import Dropdown from '../dropdown';
import { NavigableMenu } from '../navigable-container';

function DropdownMenu(_ref) {
  var _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? 'menu' : _ref$icon,
      label = _ref.label,
      menuLabel = _ref.menuLabel,
      controls = _ref.controls,
      className = _ref.className;

  if (!controls || !controls.length) {
    return null;
  } // Normalize controls to nested array of objects (sets of controls)


  var controlSets = controls;

  if (!Array.isArray(controlSets[0])) {
    controlSets = [controlSets];
  }

  return createElement(Dropdown, {
    className: classnames('components-dropdown-menu', className),
    contentClassName: "components-dropdown-menu__popover",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;

      var openOnArrowDown = function openOnArrowDown(event) {
        if (!isOpen && event.keyCode === DOWN) {
          event.preventDefault();
          event.stopPropagation();
          onToggle();
        }
      };

      return createElement(IconButton, {
        className: "components-dropdown-menu__toggle",
        icon: icon,
        onClick: onToggle,
        onKeyDown: openOnArrowDown,
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
        label: label,
        tooltip: label
      }, createElement("span", {
        className: "components-dropdown-menu__indicator"
      }));
    },
    renderContent: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      return createElement(NavigableMenu, {
        className: "components-dropdown-menu__menu",
        role: "menu",
        "aria-label": menuLabel
      }, flatMap(controlSets, function (controlSet, indexOfSet) {
        return controlSet.map(function (control, indexOfControl) {
          return createElement(IconButton, {
            key: [indexOfSet, indexOfControl].join(),
            onClick: function onClick(event) {
              event.stopPropagation();
              onClose();

              if (control.onClick) {
                control.onClick();
              }
            },
            className: classnames('components-dropdown-menu__menu-item', {
              'has-separator': indexOfSet > 0 && indexOfControl === 0,
              'is-active': control.isActive
            }),
            icon: control.icon,
            role: "menuitem",
            disabled: control.isDisabled
          }, control.title);
        });
      }));
    }
  });
}

export default DropdownMenu;
//# sourceMappingURL=index.js.map