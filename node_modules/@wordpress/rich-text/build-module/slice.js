/**
 * Slice a Rich Text value from `startIndex` to `endIndex`. Indices are
 * retrieved from the selection if none are provided. This is similar to
 * `String.prototype.slice`.
 *
 * @param {Object} value       Value to modify.
 * @param {number} startIndex  Start index.
 * @param {number} endIndex    End index.
 *
 * @return {Object} A new extracted value.
 */
export function slice(_ref) {
  var formats = _ref.formats,
      text = _ref.text,
      start = _ref.start,
      end = _ref.end;
  var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : start;
  var endIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : end;

  if (startIndex === undefined || endIndex === undefined) {
    return {
      formats: formats,
      text: text
    };
  }

  return {
    formats: formats.slice(startIndex, endIndex),
    text: text.slice(startIndex, endIndex)
  };
}
//# sourceMappingURL=slice.js.map