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
  describe('/GET Queries', () => {
    it('it should GET all queries when a valid admin\'s x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).get('/api/queries').set('x-auth-token', process.authTokens.pacome).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
    it('it can not GET queries when a non admin\'s x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).get('/api/queries').set('x-auth-token', process.authTokens.jane).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql("Unauthorized action.");
        done();
      });
    });
    it('it can not GET queries when a invalid x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).get('/api/queries').set('x-auth-token', "some random stuffs sdkfl").send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(400);
        res.body.should.have.property('error').eql("Invalid token.");
        done();
      });
    });
    it('it can not GET queries when no x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).get('/api/queries').send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql('Access denied. No token provided.');
        done();
      });
    });
  });
};

var _default = myFunction;
exports.default = _default;