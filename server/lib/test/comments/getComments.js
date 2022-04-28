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
  describe('/GET Comments', () => {
    it('it should GET all the comments', done => {
      _chai.default.request(_index.default).get('/api/comments').end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
    it('it should GET comments for a single article', done => {
      _chai.default.request(_index.default).get('/api/comments/' + process.articleID).end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
    it('it can not GET a comment when the provided comment ID is invalid', done => {
      _chai.default.request(_index.default).get('/api/comments/' + "some random stuffs sldjf").send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(404);
        res.body.should.have.property('error').eql("Article's comments not found!");
        done();
      });
    });
  });
};

var _default = myFunction;
exports.default = _default;