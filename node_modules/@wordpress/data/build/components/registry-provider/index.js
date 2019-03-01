"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RegistryConsumer = void 0;

var _element = require("@wordpress/element");

var _defaultRegistry = _interopRequireDefault(require("../../default-registry"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _createContext = (0, _element.createContext)(_defaultRegistry.default),
    Consumer = _createContext.Consumer,
    Provider = _createContext.Provider;

var RegistryConsumer = Consumer;
exports.RegistryConsumer = RegistryConsumer;
var _default = Provider;
exports.default = _default;
//# sourceMappingURL=index.js.map