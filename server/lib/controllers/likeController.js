"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _Like = _interopRequireDefault(require("../models/Like"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const likeController = {};

likeController.getAll = async (req, res) => {
  const likes = await _Like.default.find();
  res.send(likes);
};

likeController.post = async (req, res) => {
  const like = new _Like.default({
    articleID: req.body.articleID,
    email: req.body.email,
    likeBool: req.body.likeBool
  });
  await like.save();
  res.send(like);
};

likeController.getOne = async (req, res) => {
  try {
    const like = await _Like.default.find({
      articleID: req.params.id
    });
    res.send(like);
  } catch (_unused) {
    res.status(404);
    res.send({
      error: "Like doesn't exist!"
    });
  }
};

likeController.delete = async (req, res) => {
  try {
    await _Like.default.deleteOne({
      _id: req.params.id
    });
    res.status(204).send();
  } catch (_unused2) {
    res.status(404);
    res.send({
      error: "Like doesn't exist!"
    });
  }
};

var _default = likeController;
exports.default = _default;