"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Comment = _interopRequireDefault(require("../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const commentController = {};

commentController.getAll = async (req, res) => {
  const comments = await _Comment.default.find();
  res.send(comments);
};

commentController.post = async (req, res) => {
  const comment = new _Comment.default({
    articleID: req.body.articleID,
    userID: req.user._id,
    name: req.user.name,
    commentBody: req.body.commentBody
  });
  await comment.save();
  res.send(comment);
};

commentController.getOne = async (req, res) => {
  try {
    const comment = await _Comment.default.find({
      articleID: req.params.id
    });
    if (comment.length == 0) throw error;
    res.send(comment);
  } catch {
    res.status(404);
    res.send({
      error: "Article's comments not found!"
    });
  }
};

commentController.delete = async (req, res) => {
  if (!(req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com")) {
    return res.status(401).send({
      error: 'Unauthorized action.'
    });
  }

  try {
    await _Comment.default.deleteOne({
      _id: req.params.id
    });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({
      error: "Comment doesn't exist!"
    });
  }
};

var _default = commentController;
exports.default = _default;