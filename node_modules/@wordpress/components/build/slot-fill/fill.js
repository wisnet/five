"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _context = require("./context");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var occurrences = 0;

var FillComponent =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FillComponent, _Component);

  function FillComponent() {
    var _this;

    (0, _classCallCheck2.default)(this, FillComponent);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FillComponent).apply(this, arguments));
    _this.occurrence = ++occurrences;
    return _this;
  }

  (0, _createClass2.default)(FillComponent, [{
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


      if ((0, _lodash.isFunction)(children)) {
        children = children(slot.props.fillProps);
      }

      return (0, _element.createPortal)(children, slot.node);
    }
  }]);
  return FillComponent;
}(_element.Component);

var Fill = function Fill(props) {
  return (0, _element.createElement)(_context.Consumer, null, function (_ref) {
    var getSlot = _ref.getSlot,
        registerFill = _ref.registerFill,
        unregisterFill = _ref.unregisterFill;
    return (0, _element.createElement)(FillComponent, (0, _extends2.default)({}, props, {
      getSlot: getSlot,
      registerFill: registerFill,
      unregisterFill: unregisterFill
    }));
  });
};

var _default = Fill;
exports.default = _default;
//# sourceMappingURL=fill.js.map