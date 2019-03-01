"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _keycodes = require("@wordpress/keycodes");

var _dom = require("@wordpress/dom");

var _compose = require("@wordpress/compose");

var _reactClickOutside = _interopRequireDefault(require("react-click-outside"));

var _withFocusReturn = _interopRequireDefault(require("../higher-order/with-focus-return"));

var _withConstrainedTabbing = _interopRequireDefault(require("../higher-order/with-constrained-tabbing"));

/**
 * WordPress dependencies
 */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
var ModalFrame =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ModalFrame, _Component);

  function ModalFrame() {
    var _this;

    (0, _classCallCheck2.default)(this, ModalFrame);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ModalFrame).apply(this, arguments));
    _this.containerRef = (0, _element.createRef)();
    _this.handleKeyDown = _this.handleKeyDown.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleClickOutside = _this.handleClickOutside.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.focusFirstTabbable = _this.focusFirstTabbable.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }
  /**
   * Focuses the first tabbable element when props.focusOnMount is true.
   */


  (0, _createClass2.default)(ModalFrame, [{
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
      var tabbables = _dom.focus.tabbable.find(this.containerRef.current);

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
      if (event.keyCode === _keycodes.ESCAPE) {
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
      return (0, _element.createElement)("div", {
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
}(_element.Component);

var _default = (0, _compose.compose)([_withFocusReturn.default, _withConstrainedTabbing.default, _reactClickOutside.default, (0, _compose.withGlobalEvents)({
  keydown: 'handleKeyDown'
})])(ModalFrame);

exports.default = _default;
//# sourceMappingURL=frame.js.map