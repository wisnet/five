import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';

function BaseControl(_ref) {
  var id = _ref.id,
      label = _ref.label,
      help = _ref.help,
      className = _ref.className,
      children = _ref.children;
  return createElement("div", {
    className: classnames('components-base-control', className)
  }, createElement("div", {
    className: "components-base-control__field"
  }, label && id && createElement("label", {
    className: "components-base-control__label",
    htmlFor: id
  }, label), label && !id && createElement("span", {
    className: "components-base-control__label"
  }, label), children), !!help && createElement("p", {
    id: id + '__help',
    className: "components-base-control__help"
  }, help));
}

export default BaseControl;
//# sourceMappingURL=index.js.map