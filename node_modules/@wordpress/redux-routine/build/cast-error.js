"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = castError;

/**
 * Casts value as an error if it's not one.
 *
 * @param {*} error The value to cast.
 *
 * @return {Error} The cast error.
 */
function castError(error) {
  if (!(error instanceof Error)) {
    error = new Error(error);
  }

  return error;
}
//# sourceMappingURL=cast-error.js.map