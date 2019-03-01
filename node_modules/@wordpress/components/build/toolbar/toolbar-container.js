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
var ToolbarContainer = function ToolbarContainer(props) {
  return (0, _element.createElement)("div", {
    className: (0, _classnames.default)('components-toolbar', props.className)
  }, props.children);
};

var _default = ToolbarContainer;
exports.default = _default;
//# sourceMappingURL=toolbar-container.js.map