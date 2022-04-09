"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schemas = {
  article: _joi.default.object().keys({
    title: _joi.default.string().required(),
    previewImageURL: _joi.default.string().required(),
    articleBody: _joi.default.string().required()
  }),
  query: _joi.default.object().keys({
    name: _joi.default.string().required(),
    email: _joi.default.string().required(),
    queryBody: _joi.default.string().required()
  }),
  comment: _joi.default.object().keys({
    articleID: _joi.default.string().required(),
    name: _joi.default.string().required(),
    email: _joi.default.string().required(),
    commentBody: _joi.default.string().required()
  }),
  like: _joi.default.object().keys({
    articleID: _joi.default.string().required(),
    email: _joi.default.string().required(),
    likeBool: _joi.default.boolean().required()
  }) // future schemas will be defined here below ...

};
var _default = schemas;
exports.default = _default;