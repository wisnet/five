"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.charAt = charAt;

/**
 * Gets the character at the specified index, or returns `undefined` if no
 * character was found.
 *
 * @param {Object} value Value to get the character from.
 * @param {string} index Index to use.
 *
 * @return {?string} A one character long string, or undefined.
 */
function charAt(_ref, index) {
  var text = _ref.text;
  return text[index];
}
//# sourceMappingURL=char-at.js.map