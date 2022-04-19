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
  describe('/POST Likes', () => {
    it('it can not POST likes when no x-auth-token is sent in request\'s header', done => {
      let like = {
        "articleID": process.articleID
      };

      _chai.default.request(_index.default).post('/api/likes').send(like).end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql('Access denied. No token provided.');
        done();
      });
    });
    it('it should not POST a like with an invalid auth token', done => {
      let like = {
        "articleID": process.articleID
      };

      _chai.default.request(_index.default).post('/api/likes').set('x-auth-token', 'invalid random stuff aksjd').send(like).end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql("Invalid token.");
        done();
      });
    });
    it('it should not POST a like without "articleID" field', done => {
      let like = {
        "likeBody": "Good work!"
      };

      _chai.default.request(_index.default).post('/api/likes').set('x-auth-token', process.authTokens.jane).send(like).end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql("\"articleID\" is required");
        done();
      });
    });
    it('it should POST a like when all the 4 above conditions are corrected', done => {
      let like = {
        "articleID": process.articleID
      };

      _chai.default.request(_index.default).post('/api/likes').set('x-auth-token', process.authTokens.jane).send(like).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.userID.should.be.a('string');
        res.body.articleID.should.be.a('string');
        process.likeID = res.body._id;
        done();
      });
    });
    it('it should delete a like, when it is re-issued for the second time', done => {
      let like = {
        "articleID": process.articleID
      };

      _chai.default.request(_index.default).post('/api/likes').set('x-auth-token', process.authTokens.jane).send(like).end((err, res) => {
        res.should.have.status(204);
        done();
      });
    });
    it('it should re POST a like when it is re-issued, after \'unliking\' action', done => {
      let like = {
        "articleID": process.articleID
      };

      _chai.default.request(_index.default).post('/api/likes').set('x-auth-token', process.authTokens.jane).send(like).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.userID.should.be.a('string');
        res.body.articleID.should.be.a('string');
        process.likeID = res.body._id;
        done();
      });
    });
  });
};

var _default = myFunction;
exports.default = _default;