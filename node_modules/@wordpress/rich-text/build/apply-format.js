"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyFormat = applyFormat;

var _lodash = require("lodash");

var _normaliseFormats = require("./normalise-formats");

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Apply a format object to a Rich Text value from the given `startIndex` to the
 * given `endIndex`. Indices are retrieved from the selection if none are
 * provided.
 *
 * @param {Object} value      Value to modify.
 * @param {Object} format     Format to apply.
 * @param {number} startIndex Start index.
 * @param {number} endIndex   End index.
 *
 * @return {Object} A new value with the format applied.
 */
function applyFormat(_ref, format) {
  var formats = _ref.formats,
      text = _ref.text,
      start = _ref.start,
      end = _ref.end;
  var startIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : start;
  var endIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : end;
  var newFormats = formats.slice(0); // The selection is collpased.

  if (startIndex === endIndex) {
    var startFormat = (0, _lodash.find)(newFormats[startIndex], {
      type: format.type
    }); // If the caret is at a format of the same type, expand start and end to
    // the edges of the format. This is useful to apply new attributes.

    if (startFormat) {
      while ((0, _lodash.find)(newFormats[startIndex], startFormat)) {
        applyFormats(newFormats, startIndex, format);
        startIndex--;
      }

      endIndex++;

      while ((0, _lodash.find)(newFormats[endIndex], startFormat)) {
        applyFormats(newFormats, endIndex, format);
        endIndex++;
      } // Otherwise, insert a placeholder with the format so new input appears
      // with the format applied.

    } else {
      var previousFormat = newFormats[startIndex - 1] || [];
      var hasType = (0, _lodash.find)(previousFormat, {
        type: format.type
      });
      return {
        formats: formats,
        text: text,
        start: start,
        end: end,
        formatPlaceholder: {
          index: startIndex,
          format: hasType ? undefined : format
        }
      };
    }
  } else {
    for (var index = startIndex; index < endIndex; index++) {
      applyFormats(newFormats, index, format);
    }
  }

  return (0, _normaliseFormats.normaliseFormats)({
    formats: newFormats,
    text: text,
    start: start,
    end: end
  });
}

function applyFormats(formats, index, format) {
  if (formats[index]) {
    var newFormatsAtIndex = formats[index].filter(function (_ref2) {
      var type = _ref2.type;
      return type !== format.type;
    });
    newFormatsAtIndex.push(format);
    formats[index] = newFormatsAtIndex;
  } else {
    formats[index] = [format];
  }
}
//# sourceMappingURL=apply-format.js.map