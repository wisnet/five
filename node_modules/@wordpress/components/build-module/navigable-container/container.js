import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External Dependencies
 */
import { omit, noop, isFunction } from 'lodash';
/**
 * WordPress Dependencies
 */

import { Component, forwardRef } from '@wordpress/element';
import { focus } from '@wordpress/dom';

function cycleValue(value, total, offset) {
  var nextValue = value + offset;

  if (nextValue < 0) {
    return total + nextValue;
  } else if (nextValue >= total) {
    return nextValue - total;
  }

  return nextValue;
}

var NavigableContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(NavigableContainer, _Component);

  function NavigableContainer() {
    var _this;

    _classCallCheck(this, NavigableContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavigableContainer).apply(this, arguments));
    _this.onKeyDown = _this.onKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindContainer = _this.bindContainer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getFocusableContext = _this.getFocusableContext.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getFocusableIndex = _this.getFocusableIndex.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(NavigableContainer, [{
    key: "bindContainer",
    value: function bindContainer(ref) {
      var forwardedRef = this.props.forwardedRef;
      this.container = ref;

      if (isFunction(forwardedRef)) {
        forwardedRef(ref);
      } else if (forwardedRef && 'current' in forwardedRef) {
        forwardedRef.current = ref;
      }
    }
  }, {
    key: "getFocusableContext",
    value: function getFocusableContext(target) {
      var onlyBrowserTabstops = this.props.onlyBrowserTabstops;
      var finder = onlyBrowserTabstops ? focus.tabbable : focus.focusable;
      var focusables = finder.find(this.container);
      var index = this.getFocusableIndex(focusables, target);

      if (index > -1 && target) {
        return {
          index: index,
          target: target,
          focusables: focusables
        };
      }

      return null;
    }
  }, {
    key: "getFocusableIndex",
    value: function getFocusableIndex(focusables, target) {
      var directIndex = focusables.indexOf(target);

      if (directIndex !== -1) {
        return directIndex;
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      if (this.props.onKeyDown) {
        this.props.onKeyDown(event);
      }

      var getFocusableContext = this.getFocusableContext;
      var _this$props = this.props,
          _this$props$cycle = _this$props.cycle,
          cycle = _this$props$cycle === void 0 ? true : _this$props$cycle,
          eventToOffset = _this$props.eventToOffset,
          _this$props$onNavigat = _this$props.onNavigate,
          onNavigate = _this$props$onNavigat === void 0 ? noop : _this$props$onNavigat,
          stopNavigationEvents = _this$props.stopNavigationEvents;
      var offset = eventToOffset(event); // eventToOffset returns undefined if the event is not handled by the component

      if (offset !== undefined && stopNavigationEvents) {
        // Prevents arrow key handlers bound to the document directly interfering
        event.nativeEvent.stopImmediatePropagation(); // When navigating a collection of items, prevent scroll containers
        // from scrolling.

        if (event.target.getAttribute('role') === 'menuitem') {
          event.preventDefault();
        }

        event.stopPropagation();
      }

      if (!offset) {
        return;
      }

      var context = getFocusableContext(document.activeElement);

      if (!context) {
        return;
      }

      var index = context.index,
          focusables = context.focusables;
      var nextIndex = cycle ? cycleValue(index, focusables.length, offset) : index + offset;

      if (nextIndex >= 0 && nextIndex < focusables.length) {
        focusables[nextIndex].focus();
        onNavigate(nextIndex, focusables[nextIndex]);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          props = _objectWithoutProperties(_this$props2, ["children"]); // Disable reason: Assumed role is applied by parent via props spread.

      /* eslint-disable jsx-a11y/no-static-element-interactions */


      return createElement("div", _extends({
        ref: this.bindContainer
      }, omit(props, ['stopNavigationEvents', 'eventToOffset', 'onNavigate', 'cycle', 'onlyBrowserTabstops', 'forwardedRef']), {
        onKeyDown: this.onKeyDown,
        onFocus: this.onFocus
      }), children);
    }
  }]);

  return NavigableContainer;
}(Component);

var forwardedNavigableContainer = function forwardedNavigableContainer(props, ref) {
  return createElement(NavigableContainer, _extends({}, props, {
    forwardedRef: ref
  }));
};

forwardedNavigableContainer.displayName = 'NavigableContainer';
export default forwardRef(forwardedNavigableContainer);
//# sourceMappingURL=container.js.map