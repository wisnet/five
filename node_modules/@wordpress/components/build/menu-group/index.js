"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuGroup = MenuGroup;
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = require("@wordpress/compose");

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
function MenuGroup(_ref) {
  var children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      instanceId = _ref.instanceId,
      label = _ref.label;

  if (!_element.Children.count(children)) {
    return null;
  }

  var labelId = "components-menu-group-label-".concat(instanceId);
  var classNames = (0, _classnames.default)(className, 'components-menu-group');
  return (0, _element.createElement)("div", {
    className: classNames
  }, label && (0, _element.createElement)("div", {
    className: "components-menu-group__label",
    id: labelId
  }, label), (0, _element.createElement)(_navigableContainer.NavigableMenu, {
    orientation: "vertical",
    "aria-labelledby": labelId
  }, children));
}

var _default = (0, _compose.withInstanceId)(MenuGroup);

exports.default = _default;
//# sourceMappingURL=index.js.map