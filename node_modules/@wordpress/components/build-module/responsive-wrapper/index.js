import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress Dependencies
 */

import { cloneElement, Children } from '@wordpress/element';

function ResponsiveWrapper(_ref) {
  var naturalWidth = _ref.naturalWidth,
      naturalHeight = _ref.naturalHeight,
      children = _ref.children;

  if (Children.count(children) !== 1) {
    return null;
  }

  var imageStyle = {
    paddingBottom: naturalHeight / naturalWidth * 100 + '%'
  };
  return createElement("div", {
    className: "components-responsive-wrapper"
  }, createElement("div", {
    style: imageStyle
  }), cloneElement(children, {
    className: classnames('components-responsive-wrapper__content', children.props.className)
  }));
}

export default ResponsiveWrapper;
//# sourceMappingURL=index.js.map