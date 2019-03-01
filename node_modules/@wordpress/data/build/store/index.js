"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reducer = _interopRequireDefault(require("./reducer"));

var selectors = _interopRequireWildcard(require("./selectors"));

var actions = _interopRequireWildcard(require("./actions"));

/**
 * Internal dependencies
 */
var _default = {
  reducer: _reducer.default,
  actions: actions,
  selectors: selectors
};
exports.default = _default;
//# sourceMappingURL=index.js.map