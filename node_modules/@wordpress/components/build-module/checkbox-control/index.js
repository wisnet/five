import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { withInstanceId } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import BaseControl from '../base-control';

function CheckboxControl(_ref) {
  var label = _ref.label,
      className = _ref.className,
      heading = _ref.heading,
      checked = _ref.checked,
      help = _ref.help,
      instanceId = _ref.instanceId,
      onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ["label", "className", "heading", "checked", "help", "instanceId", "onChange"]);

  var id = "inspector-checkbox-control-".concat(instanceId);

  var onChangeValue = function onChangeValue(event) {
    return onChange(event.target.checked);
  };

  return createElement(BaseControl, {
    label: heading,
    id: id,
    help: help,
    className: className
  }, createElement("input", _extends({
    id: id,
    className: "components-checkbox-control__input",
    type: "checkbox",
    value: "1",
    onChange: onChangeValue,
    checked: checked,
    "aria-describedby": !!help ? id + '__help' : undefined
  }, props)), createElement("label", {
    className: "components-checkbox-control__label",
    htmlFor: id
  }, label));
}

export default withInstanceId(CheckboxControl);
//# sourceMappingURL=index.js.map