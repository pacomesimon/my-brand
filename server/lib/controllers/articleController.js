"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Article = _interopRequireDefault(require("../models/Article"));

var _Like = _interopRequireDefault(require("../models/Like"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const articleController = {};

articleController.getAll = async (req, res) => {
  const articles = await _Article.default.find();
  res.send(articles);
};

articleController.post = async (req, res) => {
  const article = new _Article.default({
    title: req.body.title,
    previewImageURL: req.body.previewImageURL,
    articleBody: req.body.articleBody
  });
  await article.save();
  res.send(article);
};

articleController.getOne = async (req, res) => {
  try {
    const article = await _Article.default.findOne({
      _id: req.params.id
    });

    try {
      var likes = await _Like.default.find({
        articleID: req.params.id
      });
    } catch {
      var likes = [];
    }

    try {
      var comments = await _Comment.default.find({
        articleID: req.params.id
      });
    } catch {
      var comments = [];
    }

    article.likes = likes.length;
    article.comments = comments;
    res.send({
      article: article,
      likes: likes.length,
      comments: comments
    });
  } catch {
    res.status(404);
    res.send({
      error: "Article doesn't exist!"
    });
  }
};

articleController.patch = async (req, res) => {
  try {
    const article = await _Article.default.findOne({
      _id: req.params.id
    });

    if (req.body.title) {
      article.title = req.body.title;
    }

    if (req.body.previewImageURL) {
      article.previewImageURL = req.body.previewImageURL;
    }

    if (req.body.articleBody) {
      article.articleBody = req.body.articleBody;
    }

    await article.save();
    res.status(201);
    res.send(article);
  } catch {
    res.status(404);
    res.send({
      error: "Article doesn't exist!"
    });
  }
};

articleController.delete = async (req, res) => {
  try {
    await _Article.default.deleteOne({
      _id: req.params.id
    });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({
      error: "Article doesn't exist!"
    });
  }
};

var _default = articleController;
exports.default = _default;