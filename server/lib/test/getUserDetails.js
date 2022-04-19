"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../index"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let should = _chai.default.should();

_chai.default.use(_chaiHttp.default);

let myFunction = () => {
  describe('/GET user details', () => {
    it('it should GET any user\'s details (password excluded), when a user._id is provided in the url', done => {
      _chai.default.request(_index.default).get('/api/users/' + process.usersDetails.boy._id).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');

        res.body._id.should.be.a('string');

        res.body.name.should.be.a('string');
        res.body.email.should.be.a('string');
        res.body.membership.should.be.a('string');
        done();
      });
    });
    it('it should GET all users\' details when a valid admin\'s x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).get('/api/users/').set('x-auth-token', process.authTokens.pacome).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
    it('it can not GET all users\' details when a non admin\'s x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).get('/api/users/').set('x-auth-token', process.authTokens.boy).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql("Unauthorized action.");
        done();
      });
    });
    it('it can not GET all users\' details when no x-auth-token is sent in request\'s header', done => {
      _chai.default.request(_index.default).get('/api/users/').send().end((err, res) => {
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