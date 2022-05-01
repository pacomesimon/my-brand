"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/articles/:id", _express.default.static('UI')); // async (req, res) => {
//     const articles = {me: "you are a visitor"};
//     res.send(articles);
//   });

var _default = router;
exports.default = _default;