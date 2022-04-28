"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = _mongoose.default.Schema({
  userID: String,
  name: String,
  email: String,
  queryBody: String,
  date: String
});

var _default = _mongoose.default.model("Query", schema);

exports.default = _default;