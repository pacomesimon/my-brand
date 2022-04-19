"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Like = _interopRequireDefault(require("../models/Like"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const likeController = {};

likeController.getAll = async (req, res) => {
  if (!(req.user._id == req.params.id || req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com")) {
    return res.status(401).send({
      error: 'Unauthorized action.'
    });
  }

  const likes = await _Like.default.find();
  res.send(likes);
};

likeController.post = async (req, res) => {
  const storedLike = await _Like.default.findOne({
    articleID: req.body.articleID,
    userID: req.user._id
  });

  if (storedLike == null) {
    const like = new _Like.default({
      articleID: req.body.articleID,
      userID: req.user._id
    });
    await like.save();
    res.send(like);
  } else {
    await _Like.default.deleteOne({
      articleID: req.body.articleID,
      userID: req.user._id
    });
    res.status(204).send();
  }
};

likeController.getOne = async (req, res) => {
  if (!(req.user._id == req.params.id || req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com")) {
    return res.status(401).send({
      error: 'Unauthorized action.'
    });
  }

  try {
    const like = await _Like.default.find({
      articleID: req.params.id
    });
    if (like.length == 0) throw error;
    res.send(like);
  } catch {
    res.status(404);
    res.send({
      error: "Article's likes not found!"
    });
  }
};

likeController.delete = async (req, res) => {
  if (!(req.user._id == req.params.id || req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com")) {
    return res.status(401).send({
      error: 'Unauthorized action.'
    });
  }

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