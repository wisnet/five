"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _toolbarButton = _interopRequireDefault(require("../toolbar-button"));

var _dropdownMenu = _interopRequireDefault(require("../dropdown-menu"));

var _toolbarContainer = _interopRequireDefault(require("./toolbar-container"));

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Renders a toolbar with controls.
 *
 * The `controls` prop accepts an array of sets. A set is an array of controls.
 * Controls have the following shape:
 *
 * ```
 * {
 *   icon: string,
 *   title: string,
 *   subscript: string,
 *   onClick: Function,
 *   isActive: boolean,
 *   isDisabled: boolean
 * }
 * ```
 *
 * For convenience it is also possible to pass only an array of controls. It is
 * then assumed this is the only set.
 *
 * Either `controls` or `children` is required, otherwise this components
 * renders nothing.
 *
 * @param {?Array}        controls  The controls to render in this toolbar.
 * @param {?ReactElement} children  Any other things to render inside the
 *                                  toolbar besides the controls.
 * @param {?string}       className Class to set on the container div.
 *
 * @return {ReactElement} The rendered toolbar.
 */
function Toolbar(_ref) {
  var _ref$controls = _ref.controls,
      controls = _ref$controls === void 0 ? [] : _ref$controls,
      children = _ref.children,
      className = _ref.className,
      isCollapsed = _ref.isCollapsed,
      icon = _ref.icon,
      label = _ref.label;

  if ((!controls || !controls.length) && !children) {
    return null;
  } // Normalize controls to nested array of objects (sets of controls)


  var controlSets = controls;

  if (!Array.isArray(controlSets[0])) {
    controlSets = [controlSets];
  }

  if (isCollapsed) {
    return (0, _element.createElement)(_dropdownMenu.default, {
      icon: icon,
      label: label,
      controls: controlSets,
      className: (0, _classnames.default)('components-toolbar', className)
    });
  }

  return (0, _element.createElement)(_toolbarContainer.default, {
    className: (0, _classnames.default)('components-toolbar', className)
  }, (0, _lodash.flatMap)(controlSets, function (controlSet, indexOfSet) {
    return controlSet.map(function (control, indexOfControl) {
      return (0, _element.createElement)(_toolbarButton.default, (0, _extends2.default)({
        key: [indexOfSet, indexOfControl].join(),
        containerClassName: indexOfSet > 0 && indexOfControl === 0 ? 'has-left-divider' : null
      }, control));
    });
  }), children);
}

var _default = Toolbar;
exports.default = _default;
//# sourceMappingURL=index.js.map