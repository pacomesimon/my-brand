"use strict";

var _config = _interopRequireDefault(require("config"));

var _index = _interopRequireDefault(require("../index"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

var _postSignup = _interopRequireDefault(require("./postSignup"));

var _patchSignup = _interopRequireDefault(require("./patchSignup"));

var _postSignin = _interopRequireDefault(require("./postSignin"));

var _getUserDetails = _interopRequireDefault(require("./getUserDetails"));

var _deleteUser = _interopRequireDefault(require("./deleteUser"));

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
  describe('ARTICLES', () => {
    describe('/GET All articles', () => {
      it('it should GET all the articles(empty array)', done => {
        _chai.default.request(_index.default).get('/api/articles').end((err, res) => {
          // console.log(res.body);
          // console.log("in Articles, all auth tokens are: ", (process.authTokens));
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
      });
    });
  });
});