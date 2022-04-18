"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

var _config = _interopRequireDefault(require("config"));

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//To configure the jwtPrivateKey, run this in your terminal:
//(for MAC or LINUX) $ export pacome_jwtPrivateKey=SECURE_KEY
//(for WINDOWS [CMD]) $ set pacome_jwtPrivateKey=SECURE_KEY
// where SECURE_KEY can be any string you want.
if (!_config.default.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.'); //to avoid the error, refer to the comments above this function definition.

  process.exit(1);
}

const app = (0, _express.default)();

_mongoose.default.connect(_config.default.DBHost, {
  useNewUrlParser: true
}).then(() => {
  app.use(_express.default.json());
  app.use("/api", _routes.default);
  app.listen(5000, () => {
    console.log("Server has started!");
  });
});

var _default = app;
exports.default = _default;