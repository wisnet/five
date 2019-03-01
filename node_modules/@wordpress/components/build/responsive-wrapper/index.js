"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

/**
 * External dependencies
 */

/**
 * WordPress Dependencies
 */
function ResponsiveWrapper(_ref) {
  var naturalWidth = _ref.naturalWidth,
      naturalHeight = _ref.naturalHeight,
      children = _ref.children;

  if (_element.Children.count(children) !== 1) {
    return null;
  }

  var imageStyle = {
    paddingBottom: naturalHeight / naturalWidth * 100 + '%'
  };
  return (0, _element.createElement)("div", {
    className: "components-responsive-wrapper"
  }, (0, _element.createElement)("div", {
    style: imageStyle
  }), (0, _element.cloneElement)(children, {
    className: (0, _classnames.default)('components-responsive-wrapper__content', children.props.className)
  }));
}

var _default = ResponsiveWrapper;
exports.default = _default;
//# sourceMappingURL=index.js.map