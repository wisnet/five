import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Component, createRef } from '@wordpress/element';
import { ESCAPE } from '@wordpress/keycodes';
import { focus } from '@wordpress/dom';
import { withGlobalEvents, compose } from '@wordpress/compose';
/**
 * External dependencies
 */

import clickOutside from 'react-click-outside';
/**
 * Internal dependencies
 */

import withFocusReturn from '../higher-order/with-focus-return';
import withConstrainedTabbing from '../higher-order/with-constrained-tabbing';

var ModalFrame =
/*#__PURE__*/
function (_Component) {
  _inherits(ModalFrame, _Component);

  function ModalFrame() {
    var _this;

    _classCallCheck(this, ModalFrame);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ModalFrame).apply(this, arguments));
    _this.containerRef = createRef();
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClickOutside = _this.handleClickOutside.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.focusFirstTabbable = _this.focusFirstTabbable.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }
  /**
   * Focuses the first tabbable element when props.focusOnMount is true.
   */


  _createClass(ModalFrame, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // Focus on mount
      if (this.props.focusOnMount) {
        this.focusFirstTabbable();
      }
    }
    /**
     * Focuses the first tabbable element.
     */

  }, {
    key: "focusFirstTabbable",
    value: function focusFirstTabbable() {
      var tabbables = focus.tabbable.find(this.containerRef.current);

      if (tabbables.length) {
        tabbables[0].focus();
      }
    }
    /**
     * Callback function called when clicked outside the modal.
     *
     * @param {Object} event Mouse click event.
     */

  }, {
    key: "handleClickOutside",
    value: function handleClickOutside(event) {
      if (this.props.shouldCloseOnClickOutside) {
        this.onRequestClose(event);
      }
    }
    /**
     * Callback function called when a key is pressed.
     *
     * @param {KeyboardEvent} event Key down event.
     */

  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.keyCode === ESCAPE) {
        this.handleEscapeKeyDown(event);
      }
    }
    /**
     * Handles a escape key down event.
     *
     * Calls onRequestClose and prevents default key press behaviour.
     *
     * @param {Object} event Key down event.
     */

  }, {
    key: "handleEscapeKeyDown",
    value: function handleEscapeKeyDown(event) {
      if (this.props.shouldCloseOnEsc) {
        event.preventDefault();
        this.onRequestClose(event);
      }
    }
    /**
     * Calls the onRequestClose callback props when it is available.
     *
     * @param {Object} event Event object.
     */

  }, {
    key: "onRequestClose",
    value: function onRequestClose(event) {
      var onRequestClose = this.props.onRequestClose;

      if (onRequestClose) {
        onRequestClose(event);
      }
    }
    /**
     * Renders the modal frame element.
     *
     * @return {WPElement} The modal frame element.
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          contentLabel = _this$props.contentLabel,
          _this$props$aria = _this$props.aria,
          describedby = _this$props$aria.describedby,
          labelledby = _this$props$aria.labelledby,
          children = _this$props.children,
          className = _this$props.className,
          role = _this$props.role,
          style = _this$props.style;
      return createElement("div", {
        className: className,
        style: style,
        ref: this.containerRef,
        role: role,
        "aria-label": contentLabel,
        "aria-labelledby": contentLabel ? null : labelledby,
        "aria-describedby": describedby,
        tabIndex: "-1"
      }, children);
    }
  }]);

  return ModalFrame;
}(Component);

export default compose([withFocusReturn, withConstrainedTabbing, clickOutside, withGlobalEvents({
  keydown: 'handleKeyDown'
})])(ModalFrame);
//# sourceMappingURL=frame.js.map