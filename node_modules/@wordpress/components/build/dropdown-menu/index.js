"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _keycodes = require("@wordpress/keycodes");

var _iconButton = _interopRequireDefault(require("../icon-button"));

var _dropdown = _interopRequireDefault(require("../dropdown"));

var _navigableContainer = require("../navigable-container");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
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

  return (0, _element.createElement)(_dropdown.default, {
    className: (0, _classnames.default)('components-dropdown-menu', className),
    contentClassName: "components-dropdown-menu__popover",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;

      var openOnArrowDown = function openOnArrowDown(event) {
        if (!isOpen && event.keyCode === _keycodes.DOWN) {
          event.preventDefault();
          event.stopPropagation();
          onToggle();
        }
      };

      return (0, _element.createElement)(_iconButton.default, {
        className: "components-dropdown-menu__toggle",
        icon: icon,
        onClick: onToggle,
        onKeyDown: openOnArrowDown,
        "aria-haspopup": "true",
        "aria-expanded": isOpen,
        label: label,
        tooltip: label
      }, (0, _element.createElement)("span", {
        className: "components-dropdown-menu__indicator"
      }));
    },
    renderContent: function renderContent(_ref3) {
      var onClose = _ref3.onClose;
      return (0, _element.createElement)(_navigableContainer.NavigableMenu, {
        className: "components-dropdown-menu__menu",
        role: "menu",
        "aria-label": menuLabel
      }, (0, _lodash.flatMap)(controlSets, function (controlSet, indexOfSet) {
        return controlSet.map(function (control, indexOfControl) {
          return (0, _element.createElement)(_iconButton.default, {
            key: [indexOfSet, indexOfControl].join(),
            onClick: function onClick(event) {
              event.stopPropagation();
              onClose();

              if (control.onClick) {
                control.onClick();
              }
            },
            className: (0, _classnames.default)('components-dropdown-menu__menu-item', {
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

var _default = DropdownMenu;
exports.default = _default;
//# sourceMappingURL=index.js.map