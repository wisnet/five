"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = require("@wordpress/compose");

var _keyboardShortcuts = _interopRequireDefault(require("../../keyboard-shortcuts"));

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */

/**
 * Internal Dependencies
 */
var _default = (0, _compose.createHigherOrderComponent)(function (WrappedComponent) {
  return (
    /*#__PURE__*/
    function (_Component) {
      (0, _inherits2.default)(_class, _Component);

      function _class() {
        var _this;

        (0, _classCallCheck2.default)(this, _class);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_class).apply(this, arguments));
        _this.bindContainer = _this.bindContainer.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.focusNextRegion = _this.focusRegion.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 1);
        _this.focusPreviousRegion = _this.focusRegion.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), -1);
        _this.onClick = _this.onClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        _this.state = {
          isFocusingRegions: false
        };
        return _this;
      }

      (0, _createClass2.default)(_class, [{
        key: "bindContainer",
        value: function bindContainer(ref) {
          this.container = ref;
        }
      }, {
        key: "focusRegion",
        value: function focusRegion(offset) {
          var regions = (0, _toConsumableArray2.default)(this.container.querySelectorAll('[role="region"]'));

          if (!regions.length) {
            return;
          }

          var nextRegion = regions[0];
          var selectedIndex = regions.indexOf(document.activeElement);

          if (selectedIndex !== -1) {
            var nextIndex = selectedIndex + offset;
            nextIndex = nextIndex === -1 ? regions.length - 1 : nextIndex;
            nextIndex = nextIndex === regions.length ? 0 : nextIndex;
            nextRegion = regions[nextIndex];
          }

          nextRegion.focus();
          this.setState({
            isFocusingRegions: true
          });
        }
      }, {
        key: "onClick",
        value: function onClick() {
          this.setState({
            isFocusingRegions: false
          });
        }
      }, {
        key: "render",
        value: function render() {
          var className = (0, _classnames.default)('components-navigate-regions', {
            'is-focusing-regions': this.state.isFocusingRegions
          }); // Disable reason: Clicking the editor should dismiss the regions focus style

          /* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */

          return (0, _element.createElement)("div", {
            ref: this.bindContainer,
            className: className,
            onClick: this.onClick
          }, (0, _element.createElement)(_keyboardShortcuts.default, {
            bindGlobal: true,
            shortcuts: {
              'ctrl+`': this.focusNextRegion,
              'shift+alt+n': this.focusNextRegion,
              'ctrl+shift+`': this.focusPreviousRegion,
              'shift+alt+p': this.focusPreviousRegion
            }
          }), (0, _element.createElement)(WrappedComponent, this.props));
          /* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/onclick-has-role, jsx-a11y/click-events-have-key-events */
        }
      }]);
      return _class;
    }(_element.Component)
  );
}, 'navigateRegions');

exports.default = _default;
//# sourceMappingURL=index.js.map