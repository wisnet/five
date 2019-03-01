/**
 * WordPress dependencies
 */
import { wrap, unwrap, replaceTag } from '@wordpress/dom';
/**
 * Internal dependencies
 */

import { isPhrasingContent } from './phrasing-content';

function isBlockContent(node) {
  var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return schema.hasOwnProperty(node.nodeName.toLowerCase());
}

export default function (node, doc, schema) {
  if (node.nodeName === 'SPAN') {
    var _node$style = node.style,
        fontWeight = _node$style.fontWeight,
        fontStyle = _node$style.fontStyle,
        textDecorationLine = _node$style.textDecorationLine,
        verticalAlign = _node$style.verticalAlign;

    if (fontWeight === 'bold' || fontWeight === '700') {
      wrap(doc.createElement('strong'), node);
    }

    if (fontStyle === 'italic') {
      wrap(doc.createElement('em'), node);
    }

    if (textDecorationLine === 'line-through') {
      wrap(doc.createElement('del'), node);
    }

    if (verticalAlign === 'super') {
      wrap(doc.createElement('sup'), node);
    } else if (verticalAlign === 'sub') {
      wrap(doc.createElement('sub'), node);
    }
  } else if (node.nodeName === 'B') {
    node = replaceTag(node, 'strong');
  } else if (node.nodeName === 'I') {
    node = replaceTag(node, 'em');
  } else if (node.nodeName === 'A') {
    if (node.target.toLowerCase() === '_blank') {
      node.rel = 'noreferrer noopener';
    } else {
      node.removeAttribute('target');
      node.removeAttribute('rel');
    }
  }

  if (isPhrasingContent(node) && node.hasChildNodes() && Array.from(node.childNodes).some(function (child) {
    return isBlockContent(child, schema);
  })) {
    unwrap(node);
  }
}
//# sourceMappingURL=phrasing-content-reducer.js.map