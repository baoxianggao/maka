"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = init;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _redux = require("redux");

var _immutable = require("immutable");

var _appMiddleware = _interopRequireDefault(require("./appMiddleware"));

var _reducer = _interopRequireDefault(require("./reducer"));

var _config = _interopRequireDefault(require("./config"));

var _appFactory = _interopRequireDefault(require("./appFactory"));

var _utils = require("@makajs/utils");

var globalObj = (0, _utils.getGlobal)();

function init(option) {
  (0, _config.default)(option);
  var currentConfig = _config.default.current;

  if (currentConfig.apps) {
    _appFactory.default.registerApps(currentConfig.apps);
  }

  var mw = [(0, _appMiddleware.default)(currentConfig.actionInjections || {}, currentConfig.reducerInjections || {})];

  if (currentConfig.middlewares) {
    mw = mw.concat(currentConfig.middlewares);
  }

  var store = (0, _redux.createStore)(_reducer.default, (0, _immutable.Map)(), _redux.applyMiddleware.apply(void 0, (0, _toConsumableArray2.default)(mw)));
  globalObj.reduxStore = store;
  globalObj.__maka_store__ = store;
  return store;
}