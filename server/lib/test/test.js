"use strict";

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _postSignup = _interopRequireDefault(require("./users/postSignup"));

var _patchSignup = _interopRequireDefault(require("./users/patchSignup"));

var _postSignin = _interopRequireDefault(require("./users/postSignin"));

var _getUserDetails = _interopRequireDefault(require("./users/getUserDetails"));

var _deleteUser = _interopRequireDefault(require("./users/deleteUser"));

var _getQueries = _interopRequireDefault(require("./queries/getQueries"));

var _postQueries = _interopRequireDefault(require("./queries/postQueries"));

var _deleteQueries = _interopRequireDefault(require("./queries/deleteQueries"));

var _postArticles = _interopRequireDefault(require("./articles/postArticles"));

var _getArticles = _interopRequireDefault(require("./articles/getArticles"));

var _patchArticles = _interopRequireDefault(require("./articles/patchArticles"));

var _deleteArticle = _interopRequireDefault(require("./articles/deleteArticle"));

var _postComments = _interopRequireDefault(require("./comments/postComments"));

var _getComments = _interopRequireDefault(require("./comments/getComments"));

var _deleteComments = _interopRequireDefault(require("./comments/deleteComments"));

var _postLikes = _interopRequireDefault(require("./likes/postLikes"));

var _getLikes = _interopRequireDefault(require("./likes/getLikes"));

var _deleteLikes = _interopRequireDefault(require("./likes/deleteLikes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// process.env.NODE_ENV = 'test';
let should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

process.authTokens = {}; //this variable shall be used to keep authentication tokens
//Our parent block

describe('DATABASE TESTS START!', () => {
  before(done => {
    //Before the first test, we do the following:
    // NOTHING TO DO !  
    done();
  });
  describe('USER SIGNUP AND LOGIN ', () => {
    (0, _postSignup.default)();
    (0, _patchSignup.default)();
    (0, _postSignin.default)();
    (0, _getUserDetails.default)();
    (0, _deleteUser.default)();
  });
  describe('QUERIES ', () => {
    (0, _getQueries.default)();
    (0, _postQueries.default)();
    (0, _deleteQueries.default)();
  });
  describe('ARTICLES', () => {
    (0, _postArticles.default)();
    (0, _getArticles.default)();
    (0, _patchArticles.default)();
    (0, _deleteArticle.default)();
  });
  describe('COMMENTS', () => {
    (0, _postComments.default)();
    (0, _getComments.default)();
    (0, _deleteComments.default)();
  });
  describe('LIKES', () => {
    (0, _postLikes.default)();
    (0, _getLikes.default)();
    (0, _deleteLikes.default)();
  });
});