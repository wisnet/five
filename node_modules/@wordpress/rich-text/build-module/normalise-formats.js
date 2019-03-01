/**
 * Internal dependencies
 */
import { isFormatEqual } from './is-format-equal';
/**
 * Normalises formats: ensures subsequent equal formats have the same reference.
 *
 * @param  {Object} value Value to normalise formats of.
 *
 * @return {Object} New value with normalised formats.
 */

export function normaliseFormats(_ref) {
  var formats = _ref.formats,
      text = _ref.text,
      start = _ref.start,
      end = _ref.end;
  var newFormats = formats.slice(0);
  newFormats.forEach(function (formatsAtIndex, index) {
    var lastFormatsAtIndex = newFormats[index - 1];

    if (lastFormatsAtIndex) {
      var newFormatsAtIndex = formatsAtIndex.slice(0);
      newFormatsAtIndex.forEach(function (format, formatIndex) {
        var lastFormat = lastFormatsAtIndex[formatIndex];

        if (isFormatEqual(format, lastFormat)) {
          newFormatsAtIndex[formatIndex] = lastFormat;
        }
      });
      newFormats[index] = newFormatsAtIndex;
    }
  });
  return {
    formats: newFormats,
    text: text,
    start: start,
    end: end
  };
}
//# sourceMappingURL=normalise-formats.js.map