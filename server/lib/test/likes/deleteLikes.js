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
  describe('/DELETE Likes', () => {
    it('it can not DELETE like when a non admin\'s x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).delete('/api/likes/' + process.likeID).set('x-auth-token', process.authTokens.jane).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql("Unauthorized action.");
        done();
      });
    });
    it('it can not DELETE like when an invalid x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).delete('/api/likes/' + process.likeID).set('x-auth-token', "some random stuffs dklsj").send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(400);
        res.body.should.have.property('error').eql("Invalid token.");
        done();
      });
    });
    it('it can not DELETE a like when no x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).delete('/api/likes/' + process.likeID).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql('Access denied. No token provided.');
        done();
      });
    });
    it('it can not DELETE a like when the provided like ID is invalid', done => {
      _chai.default.request(_index.default).delete('/api/likes/' + "some random stuffs sldjf").set('x-auth-token', process.authTokens.pacome).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(404);
        res.body.should.have.property('error').eql("Like doesn't exist!");
        done();
      });
    });
    it('it should DELETE a like when a valid admin\'s x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).delete('/api/likes/' + process.likeID).set('x-auth-token', process.authTokens.pacome).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(204);
        done();
      });
    });
  });
};

var _default = myFunction;
exports.default = _default;