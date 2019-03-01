"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.speak = exports.setup = void 0;

var _addContainer = _interopRequireDefault(require("./addContainer"));

var _clear = _interopRequireDefault(require("./clear"));

var _domReady = _interopRequireDefault(require("@wordpress/dom-ready"));

var _filterMessage = _interopRequireDefault(require("./filterMessage"));

/**
 * Create the live regions.
 */
var setup = function setup() {
  var containerPolite = document.getElementById('a11y-speak-polite');
  var containerAssertive = document.getElementById('a11y-speak-assertive');

  if (containerPolite === null) {
    containerPolite = (0, _addContainer.default)('polite');
  }

  if (containerAssertive === null) {
    containerAssertive = (0, _addContainer.default)('assertive');
  }
};
/**
 * Run setup on domReady.
 */


exports.setup = setup;
(0, _domReady.default)(setup);
/**
 * Update the ARIA live notification area text node.
 *
 * @param {string} message  The message to be announced by Assistive Technologies.
 * @param {string} ariaLive Optional. The politeness level for aria-live. Possible values:
 *                          polite or assertive. Default polite.
 */

var speak = function speak(message, ariaLive) {
  // Clear previous messages to allow repeated strings being read out.
  (0, _clear.default)();
  message = (0, _filterMessage.default)(message);
  var containerPolite = document.getElementById('a11y-speak-polite');
  var containerAssertive = document.getElementById('a11y-speak-assertive');

  if (containerAssertive && 'assertive' === ariaLive) {
    containerAssertive.textContent = message;
  } else if (containerPolite) {
    containerPolite.textContent = message;
  }
};

exports.speak = speak;
//# sourceMappingURL=index.js.map