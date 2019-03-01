"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reResizable = _interopRequireDefault(require("re-resizable"));

/**
 * External dependencies
 */
function ResizableBox(_ref) {
  var className = _ref.className,
      props = (0, _objectWithoutProperties2.default)(_ref, ["className"]);
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
  return (0, _element.createElement)(_reResizable.default, (0, _extends2.default)({
    className: (0, _classnames.default)('components-resizable-box__container', className),
    handleClasses: {
      top: (0, _classnames.default)(handleClassName, 'components-resizable-box__handle-top'),
      right: (0, _classnames.default)(handleClassName, 'components-resizable-box__handle-right'),
      bottom: (0, _classnames.default)(handleClassName, 'components-resizable-box__handle-bottom'),
      left: (0, _classnames.default)(handleClassName, 'components-resizable-box__handle-left')
    },
    handleStyles: {
      top: handleStylesOverrides,
      right: handleStylesOverrides,
      bottom: handleStylesOverrides,
      left: handleStylesOverrides
    }
  }, props));
}

var _default = ResizableBox;
exports.default = _default;
//# sourceMappingURL=index.js.map