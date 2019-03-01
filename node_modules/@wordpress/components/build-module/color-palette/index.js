import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
import { map } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import Button from '../button';
import Dropdown from '../dropdown';
import Tooltip from '../tooltip';
import ColorPicker from '../color-picker';
export default function ColorPalette(_ref) {
  var colors = _ref.colors,
      _ref$disableCustomCol = _ref.disableCustomColors,
      disableCustomColors = _ref$disableCustomCol === void 0 ? false : _ref$disableCustomCol,
      value = _ref.value,
      onChange = _ref.onChange,
      className = _ref.className;

  function applyOrUnset(color) {
    return function () {
      return onChange(value === color ? undefined : color);
    };
  }

  var customColorPickerLabel = __('Custom color picker');

  var classes = classnames('components-color-palette', className);
  return createElement("div", {
    className: classes
  }, map(colors, function (_ref2) {
    var color = _ref2.color,
        name = _ref2.name;
    var style = {
      color: color
    };
    var itemClasses = classnames('components-color-palette__item', {
      'is-active': value === color
    });
    return createElement("div", {
      key: color,
      className: "components-color-palette__item-wrapper"
    }, createElement(Tooltip, {
      text: name || // translators: %s: color hex code e.g: "#f00".
      sprintf(__('Color code: %s'), color)
    }, createElement("button", {
      type: "button",
      className: itemClasses,
      style: style,
      onClick: applyOrUnset(color),
      "aria-label": name ? // translators: %s: The name of the color e.g: "vivid red".
      sprintf(__('Color: %s'), name) : // translators: %s: color hex code e.g: "#f00".
      sprintf(__('Color code: %s'), color),
      "aria-pressed": value === color
    })));
  }), !disableCustomColors && createElement(Dropdown, {
    className: "components-color-palette__item-wrapper components-color-palette__custom-color",
    contentClassName: "components-color-palette__picker",
    renderToggle: function renderToggle(_ref3) {
      var isOpen = _ref3.isOpen,
          onToggle = _ref3.onToggle;
      return createElement(Tooltip, {
        text: customColorPickerLabel
      }, createElement("button", {
        type: "button",
        "aria-expanded": isOpen,
        className: "components-color-palette__item",
        onClick: onToggle,
        "aria-label": customColorPickerLabel
      }, createElement("span", {
        className: "components-color-palette__custom-color-gradient"
      })));
    },
    renderContent: function renderContent() {
      return createElement(ColorPicker, {
        color: value,
        onChangeComplete: function onChangeComplete(color) {
          return onChange(color.hex);
        },
        disableAlpha: true
      });
    }
  }), createElement(Button, {
    className: "components-color-palette__clear",
    type: "button",
    onClick: function onClick() {
      return onChange(undefined);
    },
    isSmall: true,
    isDefault: true
  }, __('Clear')));
}
//# sourceMappingURL=index.js.map