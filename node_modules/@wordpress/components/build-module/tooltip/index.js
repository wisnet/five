import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { debounce, includes } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, Children, cloneElement, concatChildren } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Popover from '../popover';
import Shortcut from '../shortcut';
/**
 * Time over children to wait before showing tooltip
 *
 * @type {Number}
 */

var TOOLTIP_DELAY = 700;

var Tooltip =
/*#__PURE__*/
function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip() {
    var _this;

    _classCallCheck(this, Tooltip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).apply(this, arguments));
    _this.delayedSetIsOver = debounce(function (isOver) {
      return _this.setState({
        isOver: isOver
      });
    }, TOOLTIP_DELAY);
    _this.state = {
      isOver: false
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.delayedSetIsOver.cancel();
    }
  }, {
    key: "emitToChild",
    value: function emitToChild(eventName, event) {
      var children = this.props.children;

      if (Children.count(children) !== 1) {
        return;
      }

      var child = Children.only(children);

      if (typeof child.props[eventName] === 'function') {
        child.props[eventName](event);
      }
    }
  }, {
    key: "createToggleIsOver",
    value: function createToggleIsOver(eventName, isDelayed) {
      var _this2 = this;

      return function (event) {
        // Preserve original child callback behavior
        _this2.emitToChild(eventName, event); // Mouse events behave unreliably in React for disabled elements,
        // firing on mouseenter but not mouseleave.  Further, the default
        // behavior for disabled elements in some browsers is to ignore
        // mouse events. Don't bother trying to to handle them.
        //
        // See: https://github.com/facebook/react/issues/4251


        if (event.currentTarget.disabled) {
          return;
        } // Needed in case unsetting is over while delayed set pending, i.e.
        // quickly blur/mouseleave before delayedSetIsOver is called


        _this2.delayedSetIsOver.cancel();

        var isOver = includes(['focus', 'mouseenter'], event.type);

        if (isOver === _this2.state.isOver) {
          return;
        }

        if (isDelayed) {
          _this2.delayedSetIsOver(isOver);
        } else {
          _this2.setState({
            isOver: isOver
          });
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          position = _this$props.position,
          text = _this$props.text,
          shortcut = _this$props.shortcut;

      if (Children.count(children) !== 1) {
        if ('development' === process.env.NODE_ENV) {
          // eslint-disable-next-line no-console
          console.error('Tooltip should be called with only a single child element.');
        }

        return children;
      }

      var child = Children.only(children);
      var isOver = this.state.isOver;
      return cloneElement(child, {
        onMouseEnter: this.createToggleIsOver('onMouseEnter', true),
        onMouseLeave: this.createToggleIsOver('onMouseLeave'),
        onClick: this.createToggleIsOver('onClick'),
        onFocus: this.createToggleIsOver('onFocus'),
        onBlur: this.createToggleIsOver('onBlur'),
        children: concatChildren(child.props.children, isOver && createElement(Popover, {
          focusOnMount: false,
          position: position,
          className: "components-tooltip",
          "aria-hidden": "true"
        }, text, createElement(Shortcut, {
          className: "components-tooltip__shortcut",
          shortcut: shortcut
        })))
      });
    }
  }]);

  return Tooltip;
}(Component);

export default Tooltip;
//# sourceMappingURL=index.js.map