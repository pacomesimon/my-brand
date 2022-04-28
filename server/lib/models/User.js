"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schema = new _mongoose.default.Schema({
  name: String,
  email: String,
  password: String,
  membership: String
});

schema.methods.generateAuthToken = function () {
  const token = _jsonwebtoken.default.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    password: this.password,
    membership: this.membership
  }, _config.default.get('jwtPrivateKey'));

  return token;
};

var _default = _mongoose.default.model("User", schema);

exports.default = _default;