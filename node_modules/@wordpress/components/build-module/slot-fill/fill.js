import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { isFunction } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, createPortal } from '@wordpress/element';
/**
 * Internal dependencies
 */

import { Consumer } from './context';
var occurrences = 0;

var FillComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(FillComponent, _Component);

  function FillComponent() {
    var _this;

    _classCallCheck(this, FillComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FillComponent).apply(this, arguments));
    _this.occurrence = ++occurrences;
    return _this;
  }

  _createClass(FillComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var registerFill = this.props.registerFill;
      registerFill(this.props.name, this);
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      if (!this.occurrence) {
        this.occurrence = ++occurrences;
      }

      var getSlot = this.props.getSlot;
      var slot = getSlot(this.props.name);

      if (slot && !slot.props.bubblesVirtually) {
        slot.forceUpdate();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var unregisterFill = this.props.unregisterFill;
      unregisterFill(this.props.name, this);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props,
          name = _this$props.name,
          unregisterFill = _this$props.unregisterFill,
          registerFill = _this$props.registerFill;

      if (prevProps.name !== name) {
        unregisterFill(prevProps.name, this);
        registerFill(name, this);
      }
    }
  }, {
    key: "resetOccurrence",
    value: function resetOccurrence() {
      this.occurrence = null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          name = _this$props2.name,
          getSlot = _this$props2.getSlot;
      var children = this.props.children;
      var slot = getSlot(name);

      if (!slot || !slot.props.bubblesVirtually) {
        return null;
      } // If a function is passed as a child, provide it with the fillProps.


      if (isFunction(children)) {
        children = children(slot.props.fillProps);
      }

      return createPortal(children, slot.node);
    }
  }]);

  return FillComponent;
}(Component);

var Fill = function Fill(props) {
  return createElement(Consumer, null, function (_ref) {
    var getSlot = _ref.getSlot,
        registerFill = _ref.registerFill,
        unregisterFill = _ref.unregisterFill;
    return createElement(FillComponent, _extends({}, props, {
      getSlot: getSlot,
      registerFill: registerFill,
      unregisterFill: unregisterFill
    }));
  });
};

export default Fill;
//# sourceMappingURL=fill.js.map