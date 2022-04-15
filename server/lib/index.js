"use strict";

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

_mongoose.default.connect("mongodb://localhost:27017/acmedb", {
  useNewUrlParser: true
}).then(() => {
  const app = (0, _express.default)();
  app.use(_express.default.json());
  app.use("/api", _routes.default);
  app.listen(5000, () => {
    console.log("Server has started!");
  });
});