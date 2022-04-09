"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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