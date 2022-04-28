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
  describe('/GET Articles', () => {
    it('it should GET all the articles', done => {
      _chai.default.request(_index.default).get('/api/articles').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(2);
        done();
      });
    });
    it('it should GET a single article', done => {
      _chai.default.request(_index.default).get('/api/articles/' + process.articleID).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.article.should.be.a('object');
        res.body.likes.should.be.a('array');
        res.body.comments.should.be.a('array');
        done();
      });
    });
    it('it can not GET a article when the provided article ID is invalid', done => {
      _chai.default.request(_index.default).get('/api/articles/' + "some random stuffs sldjf").set('x-auth-token', process.authTokens.pacome).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(404);
        res.body.should.have.property('error').eql("Article doesn't exist!");
        done();
      });
    });
  });
};

var _default = myFunction;
exports.default = _default;