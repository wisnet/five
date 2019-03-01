"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toTree = toTree;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _getFormatType = require("./get-format-type");

var _specialCharacters = require("./special-characters");

/**
 * Internal dependencies
 */
function fromFormat(_ref) {
  var type = _ref.type,
      attributes = _ref.attributes,
      unregisteredAttributes = _ref.unregisteredAttributes,
      object = _ref.object;
  var formatType = (0, _getFormatType.getFormatType)(type);

  if (!formatType) {
    return {
      type: type,
      attributes: attributes,
      object: object
    };
  }

  var elementAttributes = (0, _objectSpread2.default)({}, unregisteredAttributes);

  for (var name in attributes) {
    var key = formatType.attributes[name];

    if (key) {
      elementAttributes[key] = attributes[name];
    } else {
      elementAttributes[name] = attributes[name];
    }
  }

  if (formatType.className) {
    if (elementAttributes.class) {
      elementAttributes.class = "".concat(formatType.className, " ").concat(elementAttributes.class);
    } else {
      elementAttributes.class = formatType.className;
    }
  }

  return {
    type: formatType.tagName,
    object: formatType.object,
    attributes: elementAttributes
  };
}

function toTree(_ref2) {
  var value = _ref2.value,
      multilineTag = _ref2.multilineTag,
      _ref2$multilineWrappe = _ref2.multilineWrapperTags,
      multilineWrapperTags = _ref2$multilineWrappe === void 0 ? [] : _ref2$multilineWrappe,
      createEmpty = _ref2.createEmpty,
      append = _ref2.append,
      getLastChild = _ref2.getLastChild,
      getParent = _ref2.getParent,
      isText = _ref2.isText,
      getText = _ref2.getText,
      remove = _ref2.remove,
      appendText = _ref2.appendText,
      onStartIndex = _ref2.onStartIndex,
      onEndIndex = _ref2.onEndIndex,
      isEditableTree = _ref2.isEditableTree;
  var formats = value.formats,
      text = value.text,
      start = value.start,
      end = value.end,
      formatPlaceholder = value.formatPlaceholder;
  var formatsLength = formats.length + 1;
  var tree = createEmpty();
  var multilineFormat = {
    type: multilineTag
  };
  var lastSeparatorFormats;
  var lastCharacterFormats;
  var lastCharacter; // If we're building a multiline tree, start off with a multiline element.

  if (multilineTag) {
    append(append(tree, {
      type: multilineTag
    }), '');
    lastCharacterFormats = lastSeparatorFormats = [multilineFormat];
  } else {
    append(tree, '');
  }

  function setFormatPlaceholder(pointer, index) {
    if (isEditableTree && formatPlaceholder && formatPlaceholder.index === index) {
      var parent = getParent(pointer);

      if (formatPlaceholder.format === undefined) {
        pointer = getParent(parent);
      } else {
        pointer = append(parent, fromFormat(formatPlaceholder.format));
      }

      pointer = append(pointer, _specialCharacters.ZERO_WIDTH_NO_BREAK_SPACE);
    }

    return pointer;
  }

  var _loop = function _loop(i) {
    var character = text.charAt(i);
    var characterFormats = formats[i]; // Set multiline tags in queue for building the tree.

    if (multilineTag) {
      if (character === _specialCharacters.LINE_SEPARATOR) {
        characterFormats = lastSeparatorFormats = (characterFormats || []).reduce(function (accumulator, format) {
          if (character === _specialCharacters.LINE_SEPARATOR && multilineWrapperTags.indexOf(format.type) !== -1) {
            accumulator.push(format);
            accumulator.push(multilineFormat);
          }

          return accumulator;
        }, [multilineFormat]);
      } else {
        characterFormats = (0, _toConsumableArray2.default)(lastSeparatorFormats).concat((0, _toConsumableArray2.default)(characterFormats || []));
      }
    }

    var pointer = getLastChild(tree); // Set selection for the start of line.

    if (lastCharacter === _specialCharacters.LINE_SEPARATOR) {
      var node = pointer;

      while (!isText(node)) {
        node = getLastChild(node);
      }

      if (onStartIndex && start === i) {
        onStartIndex(tree, node);
      }

      if (onEndIndex && end === i) {
        onEndIndex(tree, node);
      }
    }

    if (characterFormats) {
      characterFormats.forEach(function (format, formatIndex) {
        if (pointer && lastCharacterFormats && format === lastCharacterFormats[formatIndex] && ( // Do not reuse the last element if the character is a
        // line separator.
        character !== _specialCharacters.LINE_SEPARATOR || characterFormats.length - 1 !== formatIndex)) {
          pointer = getLastChild(pointer);
          return;
        }

        var parent = getParent(pointer);
        var newNode = append(parent, fromFormat(format));

        if (isText(pointer) && getText(pointer).length === 0) {
          remove(pointer);
        }

        pointer = append(format.object ? parent : newNode, '');
      });
    } // No need for further processing if the character is a line separator.


    if (character === _specialCharacters.LINE_SEPARATOR) {
      lastCharacterFormats = characterFormats;
      lastCharacter = character;
      return "continue";
    }

    pointer = setFormatPlaceholder(pointer, 0); // If there is selection at 0, handle it before characters are inserted.

    if (i === 0) {
      if (onStartIndex && start === 0) {
        onStartIndex(tree, pointer);
      }

      if (onEndIndex && end === 0) {
        onEndIndex(tree, pointer);
      }
    }

    if (character !== _specialCharacters.OBJECT_REPLACEMENT_CHARACTER) {
      if (character === '\n') {
        pointer = append(getParent(pointer), {
          type: 'br',
          object: true
        }); // Ensure pointer is text node.

        pointer = append(getParent(pointer), '');
      } else if (!isText(pointer)) {
        pointer = append(getParent(pointer), character);
      } else {
        appendText(pointer, character);
      }
    }

    pointer = setFormatPlaceholder(pointer, i + 1);

    if (onStartIndex && start === i + 1) {
      onStartIndex(tree, pointer);
    }

    if (onEndIndex && end === i + 1) {
      onEndIndex(tree, pointer);
    }

    lastCharacterFormats = characterFormats;
    lastCharacter = character;
  };

  for (var i = 0; i < formatsLength; i++) {
    var _ret = _loop(i);

    if (_ret === "continue") continue;
  }

  return tree;
}
//# sourceMappingURL=to-tree.js.map