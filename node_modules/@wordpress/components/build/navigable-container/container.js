"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

var _dom = require("@wordpress/dom");

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
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
  (0, _inherits2.default)(NavigableContainer, _Component);

  function NavigableContainer() {
    var _this;

    (0, _classCallCheck2.default)(this, NavigableContainer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NavigableContainer).apply(this, arguments));
    _this.onKeyDown = _this.onKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.bindContainer = _this.bindContainer.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getFocusableContext = _this.getFocusableContext.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getFocusableIndex = _this.getFocusableIndex.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(NavigableContainer, [{
    key: "bindContainer",
    value: function bindContainer(ref) {
      var forwardedRef = this.props.forwardedRef;
      this.container = ref;

      if ((0, _lodash.isFunction)(forwardedRef)) {
        forwardedRef(ref);
      } else if (forwardedRef && 'current' in forwardedRef) {
        forwardedRef.current = ref;
      }
    }
  }, {
    key: "getFocusableContext",
    value: function getFocusableContext(target) {
      var onlyBrowserTabstops = this.props.onlyBrowserTabstops;
      var finder = onlyBrowserTabstops ? _dom.focus.tabbable : _dom.focus.focusable;
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
          onNavigate = _this$props$onNavigat === void 0 ? _lodash.noop : _this$props$onNavigat,
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
          props = (0, _objectWithoutProperties2.default)(_this$props2, ["children"]); // Disable reason: Assumed role is applied by parent via props spread.

      /* eslint-disable jsx-a11y/no-static-element-interactions */

      return (0, _element.createElement)("div", (0, _extends2.default)({
        ref: this.bindContainer
      }, (0, _lodash.omit)(props, ['stopNavigationEvents', 'eventToOffset', 'onNavigate', 'cycle', 'onlyBrowserTabstops', 'forwardedRef']), {
        onKeyDown: this.onKeyDown,
        onFocus: this.onFocus
      }), children);
    }
  }]);
  return NavigableContainer;
}(_element.Component);

var forwardedNavigableContainer = function forwardedNavigableContainer(props, ref) {
  return (0, _element.createElement)(NavigableContainer, (0, _extends2.default)({}, props, {
    forwardedRef: ref
  }));
};

forwardedNavigableContainer.displayName = 'NavigableContainer';

var _default = (0, _element.forwardRef)(forwardedNavigableContainer);

exports.default = _default;
//# sourceMappingURL=container.js.map