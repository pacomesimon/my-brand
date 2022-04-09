"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = _mongoose.default.Schema({
  title: String,
  previewImageURL: String,
  articleBody: String
});

var _default = _mongoose.default.model("Article", schema);

exports.default = _default;