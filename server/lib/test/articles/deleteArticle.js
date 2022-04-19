"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../../index"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

let myFunction = () => {
  describe('/DELETE Articles', () => {
    it('it can not DELETE article when a non admin\'s x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).delete('/api/articles/' + process.articleID).set('x-auth-token', process.authTokens.jane).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql("Unauthorized action.");
        done();
      });
    });
    it('it can not DELETE article when an invalid x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).delete('/api/articles/' + process.articleID).set('x-auth-token', "some random stuffs dklsj").send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(400);
        res.body.should.have.property('error').eql("Invalid token.");
        done();
      });
    });
    it('it can not DELETE a article when no x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).delete('/api/articles/' + process.articleID).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql('Access denied. No token provided.');
        done();
      });
    });
    it('it can not DELETE a article when the provided article ID is invalid', done => {
      _chai.default.request(_index.default).delete('/api/articles/' + "some random stuffs sldjf").set('x-auth-token', process.authTokens.pacome).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(404);
        res.body.should.have.property('error').eql("Article doesn't exist!");
        done();
      });
    });
    it('it should DELETE a article when a valid admin\'s x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).delete('/api/articles/' + process.articleID).set('x-auth-token', process.authTokens.pacome).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(204);
        done();
      });
    });
  });
};

var _default = myFunction;
exports.default = _default;