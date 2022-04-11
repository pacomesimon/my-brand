"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Like = _interopRequireDefault(require("../models/Like"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const likeController = {};

likeController.getAll = async (req, res) => {
  const likes = await _Like.default.find();
  res.send(likes);
};

likeController.post = async (req, res) => {
  const storedLike = await _Like.default.findOne({
    email: req.body.email
  });
  console.log(storedLike);

  if (storedLike == null) {
    const like = new _Like.default({
      articleID: req.body.articleID,
      email: req.body.email,
      likeBool: req.body.likeBool
    });
    await like.save();
    res.send(like);
  } else {
    await _Like.default.deleteOne({
      email: req.body.email
    });
    res.status(204).send();
  }
};

likeController.getOne = async (req, res) => {
  try {
    const like = await _Like.default.find({
      articleID: req.params.id
    });
    res.send(like);
  } catch {
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
  } catch {
    res.status(404);
    res.send({
      error: "Like doesn't exist!"
    });
  }
};

var _default = likeController;
exports.default = _default;