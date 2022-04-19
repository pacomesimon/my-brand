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
  describe('/POST Queries', () => {
    it('it can not POST queries when no x-auth-token is sent in request\'s header', done => {
      let query = {
        "queryBody": "Good work!"
      };

      _chai.default.request(_index.default).post('/api/queries').send(query).end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql('Access denied. No token provided.');
        done();
      });
    });
    it('it should not POST a query with an invalid auth token', done => {
      let query = {
        "email": "boy@doe.com"
      };

      _chai.default.request(_index.default).post('/api/queries').set('x-auth-token', 'invalid random stuff aksjd').send(query).end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql("Invalid token.");
        done();
      });
    });
    it('it should not POST a query without "queryBody" field', done => {
      let query = {
        "email": "boy@doe.com"
      };

      _chai.default.request(_index.default).post('/api/queries').set('x-auth-token', process.authTokens.jane).send(query).end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql("\"queryBody\" is required");
        done();
      });
    });
    it('it should POST a query when all the 3 above conditions are corrected', done => {
      let query = {
        "queryBody": "Good Work!"
      };

      _chai.default.request(_index.default).post('/api/queries').set('x-auth-token', process.authTokens.jane).send(query).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.userID.should.be.a('string');
        res.body.name.should.be.a('string');
        res.body.email.should.be.a('string');
        res.body.queryBody.should.be.a('string');
        process.queryID = res.body._id;
        done();
      });
    });
  });
};

var _default = myFunction;
exports.default = _default;