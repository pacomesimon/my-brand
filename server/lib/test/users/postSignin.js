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
  describe('/POST signin', () => {
    it('it can not sign in without providing email', done => {
      let signinDetails = {
        "password": "abcdefg"
      };

      _chai.default.request(_index.default).post('/api/users/signin/').send(signinDetails).end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('"email" is required');
        done();
      });
    });
    it('it can not sign in without providing password', done => {
      let signinDetails = {
        "email": "smbonimpa2011@gmail.com"
      };

      _chai.default.request(_index.default).post('/api/users/signin/').send(signinDetails).end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('"password" is required');
        done();
      });
    });
    it('it should not sign in, when a non recognized email is provided', done => {
      let signinDetails = {
        "email": "ddddsmbonimpa2011@gmail.com",
        "password": "abcdefg"
      };

      _chai.default.request(_index.default).post('/api/users/signin/').send(signinDetails).end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Invalid password or Email.');
        done();
      });
    });
    it('it should not sign in, when an invalid password is provided', done => {
      let signinDetails = {
        "email": "smbonimpa2011@gmail.com",
        "password": "zzzzzzzzzabcdefg"
      };

      _chai.default.request(_index.default).post('/api/users/signin/').send(signinDetails).end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql('Invalid Passw0rd or email.');
        done();
      });
    });
    it('it should sign in, when a valid email and its password are provided', done => {
      let signinDetails = {
        "email": "smbonimpa2011@gmail.com",
        "password": "abcdefg"
      };

      _chai.default.request(_index.default).post('/api/users/signin/').send(signinDetails).end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body["x-auth-token"].should.be.a('string');
        done();
      });
    });
  });
};

var _default = myFunction;
exports.default = _default;