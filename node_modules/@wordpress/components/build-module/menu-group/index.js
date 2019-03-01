import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Children } from '@wordpress/element';
import { withInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { NavigableMenu } from '../navigable-container';
export function MenuGroup(_ref) {
  var children = _ref.children,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      instanceId = _ref.instanceId,
      label = _ref.label;

  if (!Children.count(children)) {
    return null;
  }

  var labelId = "components-menu-group-label-".concat(instanceId);
  var classNames = classnames(className, 'components-menu-group');
  return createElement("div", {
    className: classNames
  }, label && createElement("div", {
    className: "components-menu-group__label",
    id: labelId
  }, label), createElement(NavigableMenu, {
    orientation: "vertical",
    "aria-labelledby": labelId
  }, children));
}
export default withInstanceId(MenuGroup);
//# sourceMappingURL=index.js.map