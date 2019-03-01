import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { isString } from 'lodash';
/**
 * Internal dependencies
 */

import Dashicon from '../dashicon';
/**
* Renders a placeholder. Normally used by blocks to render their empty state.
*
* @param  {Object} props The component props.
* @return {Object}       The rendered placeholder.
*/

function Placeholder(_ref) {
  var icon = _ref.icon,
      children = _ref.children,
      label = _ref.label,
      instructions = _ref.instructions,
      className = _ref.className,
      notices = _ref.notices,
      additionalProps = _objectWithoutProperties(_ref, ["icon", "children", "label", "instructions", "className", "notices"]);

  var classes = classnames('components-placeholder', className);
  return createElement("div", _extends({}, additionalProps, {
    className: classes
  }), notices, createElement("div", {
    className: "components-placeholder__label"
  }, isString(icon) ? createElement(Dashicon, {
    icon: icon
  }) : icon, label), !!instructions && createElement("div", {
    className: "components-placeholder__instructions"
  }, instructions), createElement("div", {
    className: "components-placeholder__fieldset"
  }, children));
}

export default Placeholder;
//# sourceMappingURL=index.js.map