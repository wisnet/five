import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { forEach } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component, forwardRef } from '@wordpress/element';
/**
 * Internal dependencies
 */

import createHigherOrderComponent from '../create-higher-order-component';
import Listener from './listener';
/**
 * Listener instance responsible for managing document event handling.
 *
 * @type {Listener}
 */

var listener = new Listener();

function withGlobalEvents(eventTypesToHandlers) {
  return createHigherOrderComponent(function (WrappedComponent) {
    var Wrapper =
    /*#__PURE__*/
    function (_Component) {
      _inherits(Wrapper, _Component);

      function Wrapper() {
        var _this;

        _classCallCheck(this, Wrapper);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(Wrapper).apply(this, arguments));
        _this.handleEvent = _this.handleEvent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        _this.handleRef = _this.handleRef.bind(_assertThisInitialized(_assertThisInitialized(_this)));
        return _this;
      }

      _createClass(Wrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;

          forEach(eventTypesToHandlers, function (handler, eventType) {
            listener.add(eventType, _this2);
          });
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          var _this3 = this;

          forEach(eventTypesToHandlers, function (handler, eventType) {
            listener.remove(eventType, _this3);
          });
        }
      }, {
        key: "handleEvent",
        value: function handleEvent(event) {
          var handler = eventTypesToHandlers[event.type];

          if (typeof this.wrappedRef[handler] === 'function') {
            this.wrappedRef[handler](event);
          }
        }
      }, {
        key: "handleRef",
        value: function handleRef(el) {
          this.wrappedRef = el; // Any component using `withGlobalEvents` that is not setting a `ref`
          // will cause `this.props.forwardedRef` to be `null`, so we need this
          // check.

          if (this.props.forwardedRef) {
            this.props.forwardedRef(el);
          }
        }
      }, {
        key: "render",
        value: function render() {
          return createElement(WrappedComponent, _extends({}, this.props.ownProps, {
            ref: this.handleRef
          }));
        }
      }]);

      return Wrapper;
    }(Component);

    return forwardRef(function (props, ref) {
      return createElement(Wrapper, {
        ownProps: props,
        forwardedRef: ref
      });
    });
  }, 'withGlobalEvents');
}

export default withGlobalEvents;
//# sourceMappingURL=index.js.map