"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const middleware = schema => {
  return (req, res, next) => {
    const {
      error
    } = schema.validate(req.body);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const {
        details
      } = error;
      const message = details.map(i => i.message).join(',');
      console.log("error", message);
      console.log(req.body);
      res.status(422).json({
        error: message
      });
    }
  };
};

var _default = middleware;
exports.default = _default;