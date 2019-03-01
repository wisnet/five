"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _dom = require("@wordpress/dom");

var _phrasingContent = require("./phrasing-content");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function isBlockContent(node) {
  var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return schema.hasOwnProperty(node.nodeName.toLowerCase());
}

function _default(node, doc, schema) {
  if (node.nodeName === 'SPAN') {
    var _node$style = node.style,
        fontWeight = _node$style.fontWeight,
        fontStyle = _node$style.fontStyle,
        textDecorationLine = _node$style.textDecorationLine,
        verticalAlign = _node$style.verticalAlign;

    if (fontWeight === 'bold' || fontWeight === '700') {
      (0, _dom.wrap)(doc.createElement('strong'), node);
    }

    if (fontStyle === 'italic') {
      (0, _dom.wrap)(doc.createElement('em'), node);
    }

    if (textDecorationLine === 'line-through') {
      (0, _dom.wrap)(doc.createElement('del'), node);
    }

    if (verticalAlign === 'super') {
      (0, _dom.wrap)(doc.createElement('sup'), node);
    } else if (verticalAlign === 'sub') {
      (0, _dom.wrap)(doc.createElement('sub'), node);
    }
  } else if (node.nodeName === 'B') {
    node = (0, _dom.replaceTag)(node, 'strong');
  } else if (node.nodeName === 'I') {
    node = (0, _dom.replaceTag)(node, 'em');
  } else if (node.nodeName === 'A') {
    if (node.target.toLowerCase() === '_blank') {
      node.rel = 'noreferrer noopener';
    } else {
      node.removeAttribute('target');
      node.removeAttribute('rel');
    }
  }

  if ((0, _phrasingContent.isPhrasingContent)(node) && node.hasChildNodes() && Array.from(node.childNodes).some(function (child) {
    return isBlockContent(child, schema);
  })) {
    (0, _dom.unwrap)(node);
  }
}
//# sourceMappingURL=phrasing-content-reducer.js.map