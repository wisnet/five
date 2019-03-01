"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveFormat = getActiveFormat;

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * Gets the format object by type at the start of the selection. This can be
 * used to get e.g. the URL of a link format at the current selection, but also
 * to check if a format is active at the selection. Returns undefined if there
 * is no format at the selection.
 *
 * @param {Object} value      Value to inspect.
 * @param {string} formatType Format type to look for.
 *
 * @return {?Object} Active format object of the specified type, or undefined.
 */
function getActiveFormat(_ref, formatType) {
  var formats = _ref.formats,
      start = _ref.start;

  if (start === undefined) {
    return;
  }

  return (0, _lodash.find)(formats[start], {
    type: formatType
  });
}
//# sourceMappingURL=get-active-format.js.map