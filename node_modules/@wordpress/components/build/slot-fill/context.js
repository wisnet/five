"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Consumer = exports.default = void 0;

var _element = require("@wordpress/element");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _lodash = require("lodash");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var _createContext = (0, _element.createContext)({
  registerSlot: function registerSlot() {},
  unregisterSlot: function unregisterSlot() {},
  registerFill: function registerFill() {},
  unregisterFill: function unregisterFill() {},
  getSlot: function getSlot() {},
  getFills: function getFills() {}
}),
    Provider = _createContext.Provider,
    Consumer = _createContext.Consumer;

exports.Consumer = Consumer;

var SlotFillProvider =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(SlotFillProvider, _Component);

  function SlotFillProvider() {
    var _this;

    (0, _classCallCheck2.default)(this, SlotFillProvider);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SlotFillProvider).apply(this, arguments));
    _this.registerSlot = _this.registerSlot.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.registerFill = _this.registerFill.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.unregisterSlot = _this.unregisterSlot.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.unregisterFill = _this.unregisterFill.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getSlot = _this.getSlot.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.getFills = _this.getFills.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.slots = {};
    _this.fills = {};
    _this.state = {
      registerSlot: _this.registerSlot,
      unregisterSlot: _this.unregisterSlot,
      registerFill: _this.registerFill,
      unregisterFill: _this.unregisterFill,
      getSlot: _this.getSlot,
      getFills: _this.getFills
    };
    return _this;
  }

  (0, _createClass2.default)(SlotFillProvider, [{
    key: "registerSlot",
    value: function registerSlot(name, slot) {
      this.slots[name] = slot;
      this.forceUpdateFills(name); // Sometimes the fills are registered after the initial render of slot
      // But before the registerSlot call, we need to rerender the slot

      this.forceUpdateSlot(name);
    }
  }, {
    key: "registerFill",
    value: function registerFill(name, instance) {
      this.fills[name] = (0, _toConsumableArray2.default)(this.fills[name] || []).concat([instance]);
      this.forceUpdateSlot(name);
    }
  }, {
    key: "unregisterSlot",
    value: function unregisterSlot(name) {
      delete this.slots[name];
      this.forceUpdateFills(name);
    }
  }, {
    key: "unregisterFill",
    value: function unregisterFill(name, instance) {
      this.fills[name] = (0, _lodash.without)(this.fills[name], instance);
      this.resetFillOccurrence(name);
      this.forceUpdateSlot(name);
    }
  }, {
    key: "getSlot",
    value: function getSlot(name) {
      return this.slots[name];
    }
  }, {
    key: "getFills",
    value: function getFills(name) {
      return (0, _lodash.sortBy)(this.fills[name], 'occurrence');
    }
  }, {
    key: "resetFillOccurrence",
    value: function resetFillOccurrence(name) {
      (0, _lodash.forEach)(this.fills[name], function (instance) {
        instance.resetOccurrence();
      });
    }
  }, {
    key: "forceUpdateFills",
    value: function forceUpdateFills(name) {
      (0, _lodash.forEach)(this.fills[name], function (instance) {
        instance.forceUpdate();
      });
    }
  }, {
    key: "forceUpdateSlot",
    value: function forceUpdateSlot(name) {
      var slot = this.getSlot(name);

      if (slot) {
        slot.forceUpdate();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _element.createElement)(Provider, {
        value: this.state
      }, this.props.children);
    }
  }]);
  return SlotFillProvider;
}(_element.Component);

var _default = SlotFillProvider;
exports.default = _default;
//# sourceMappingURL=context.js.map