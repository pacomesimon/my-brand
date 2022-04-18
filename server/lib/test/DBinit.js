"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect(_config.default.DBHost, {
  useNewUrlParser: true
}).then(() => {
  /* Drop the DB */
  _mongoose.default.connection.db.dropDatabase();

  console.log('database dropped!');
  process.exit(0);
});