"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _Article = _interopRequireDefault(require("../models/Article"));

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
    res.send(article);
  } catch (_unused) {
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
    res.send(article);
  } catch (_unused2) {
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
  } catch (_unused3) {
    res.status(404);
    res.send({
      error: "Article doesn't exist!"
    });
  }
};

var _default = articleController;
exports.default = _default;