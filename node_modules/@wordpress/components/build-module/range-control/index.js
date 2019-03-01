import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isFinite } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { withInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import { BaseControl, Button, Dashicon } from '../';

function RangeControl(_ref) {
  var className = _ref.className,
      label = _ref.label,
      value = _ref.value,
      instanceId = _ref.instanceId,
      onChange = _ref.onChange,
      beforeIcon = _ref.beforeIcon,
      afterIcon = _ref.afterIcon,
      help = _ref.help,
      allowReset = _ref.allowReset,
      initialPosition = _ref.initialPosition,
      props = _objectWithoutProperties(_ref, ["className", "label", "value", "instanceId", "onChange", "beforeIcon", "afterIcon", "help", "allowReset", "initialPosition"]);

  var id = "inspector-range-control-".concat(instanceId);

  var resetValue = function resetValue() {
    return onChange();
  };

  var onChangeValue = function onChangeValue(event) {
    var newValue = event.target.value;

    if (newValue === '') {
      resetValue();
      return;
    }

    onChange(Number(newValue));
  };

  var initialSliderValue = isFinite(value) ? value : initialPosition || '';
  return createElement(BaseControl, {
    label: label,
    id: id,
    help: help,
    className: classnames('components-range-control', className)
  }, beforeIcon && createElement(Dashicon, {
    icon: beforeIcon
  }), createElement("input", _extends({
    className: "components-range-control__slider",
    id: id,
    type: "range",
    value: initialSliderValue,
    onChange: onChangeValue,
    "aria-describedby": !!help ? id + '__help' : undefined
  }, props)), afterIcon && createElement(Dashicon, {
    icon: afterIcon
  }), createElement("input", _extends({
    className: "components-range-control__number",
    type: "number",
    onChange: onChangeValue,
    "aria-label": label,
    value: value
  }, props)), allowReset && createElement(Button, {
    onClick: resetValue,
    disabled: value === undefined
  }, __('Reset')));
}

export default withInstanceId(RangeControl);
//# sourceMappingURL=index.js.map