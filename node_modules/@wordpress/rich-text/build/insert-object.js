"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertObject = insertObject;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _insert = require("./insert");

/**
 * Internal dependencies
 */
var OBJECT_REPLACEMENT_CHARACTER = "\uFFFC";
/**
 * Insert a format as an object into a Rich Text value at the given
 * `startIndex`. Any content between `startIndex` and `endIndex` will be
 * removed. Indices are retrieved from the selection if none are provided.
 *
 * @param {Object} value          Value to modify.
 * @param {Object} formatToInsert Format to insert as object.
 * @param {number} startIndex     Start index.
 * @param {number} endIndex       End index.
 *
 * @return {Object} A new value with the object inserted.
 */

function insertObject(value, formatToInsert, startIndex, endIndex) {
  var valueToInsert = {
    text: OBJECT_REPLACEMENT_CHARACTER,
    formats: [[(0, _objectSpread2.default)({}, formatToInsert, {
      object: true
    })]]
  };
  return (0, _insert.insert)(value, valueToInsert, startIndex, endIndex);
}
//# sourceMappingURL=insert-object.js.map