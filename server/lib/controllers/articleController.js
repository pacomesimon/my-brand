"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.error.cause.js");

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
  if (!(req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com")) {
    return res.status(401).send('Unauthorized action.');
  }

  const today = new Date();
  const article = new _Article.default({
    title: req.body.title,
    previewImageURL: req.body.previewImageURL,
    articleBody: req.body.articleBody,
    authorID: req.user._id,
    date: JSON.stringify(today.toJSON()),
    subject: "TECH NEWS",
    readingTime: Math.ceil(req.body.articleBody.split(" ").length * 7.7 / 1000) + " MIN"
  });
  await article.save();
  res.send(article);
};

articleController.getOne = async (req, res) => {
  try {
    const singleArticle = {};
    singleArticle.article = await _Article.default.findOne({
      _id: req.params.id
    });

    if (!singleArticle.article) {
      throw Error;
    }

    try {
      singleArticle.likes = await _Like.default.find({
        articleID: req.params.id
      });
    } catch {
      singleArticle.likes = [];
    }

    try {
      singleArticle.comments = await _Comment.default.find({
        articleID: req.params.id
      });
    } catch {
      singleArticle.comments = [];
    }

    res.send(singleArticle);
  } catch {
    res.status(404);
    res.send({
      error: "Article doesn't exist!"
    });
  }
};

articleController.patch = async (req, res) => {
  if (!(req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com")) {
    return res.status(401).send('Unauthorized action.');
  }

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
      article.readingTime = Math.ceil(req.body.articleBody.split(" ").length * 7.7 / 1000) + " MIN";
    }

    if (req.body.subject) {
      article.subject = req.body.subject;
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
  if (!(req.user.membership == "admin" || req.user.email == "smbonimpa2011@gmail.com")) {
    return res.status(401).send('Unauthorized action.');
  }

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