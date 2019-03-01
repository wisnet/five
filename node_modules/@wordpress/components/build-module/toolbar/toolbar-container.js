import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';

var ToolbarContainer = function ToolbarContainer(props) {
  return createElement("div", {
    className: classnames('components-toolbar', props.className)
  }, props.children);
};

export default ToolbarContainer;
//# sourceMappingURL=toolbar-container.js.map