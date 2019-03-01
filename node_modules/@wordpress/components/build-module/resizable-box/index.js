import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import ReResizableBox from 're-resizable';

function ResizableBox(_ref) {
  var className = _ref.className,
      props = _objectWithoutProperties(_ref, ["className"]);

  // Removes the inline styles in the drag handles.
  var handleStylesOverrides = {
    width: null,
    height: null,
    top: null,
    right: null,
    bottom: null,
    left: null
  };
  var handleClassName = 'components-resizable-box__handle';
  return createElement(ReResizableBox, _extends({
    className: classnames('components-resizable-box__container', className),
    handleClasses: {
      top: classnames(handleClassName, 'components-resizable-box__handle-top'),
      right: classnames(handleClassName, 'components-resizable-box__handle-right'),
      bottom: classnames(handleClassName, 'components-resizable-box__handle-bottom'),
      left: classnames(handleClassName, 'components-resizable-box__handle-left')
    },
    handleStyles: {
      top: handleStylesOverrides,
      right: handleStylesOverrides,
      bottom: handleStylesOverrides,
      left: handleStylesOverrides
    }
  }, props));
}

export default ResizableBox;
//# sourceMappingURL=index.js.map