"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAppleOS = isAppleOS;

var _reactNative = require("react-native");

/**
 * External dependencies
 */

/**
 * Return true if platform is iOS.
 *
 * @return {boolean}         True if iOS; false otherwise.
 */
// eslint-disable-next-line no-unused-vars
function isAppleOS() {
  return _reactNative.Platform.OS === 'ios';
}
//# sourceMappingURL=platform.native.js.map