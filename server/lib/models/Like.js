"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = _mongoose.default.Schema({
  articleID: String,
  userID: String
});

var _default = _mongoose.default.model("Like", schema);

exports.default = _default;