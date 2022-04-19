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
  describe('/DELETE user', () => {
    it('it should not DELETE any user from the Database, when the x-auth-token is not provided in the header', done => {
      _chai.default.request(_index.default).delete('/api/deleteuser/' + process.usersDetails.boy._id).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql('Access denied. No token provided.');
        done();
      });
    });
    it('it should not DELETE any user from the Database, when the x-auth-token provided in the header is not from the user or admin', done => {
      _chai.default.request(_index.default).delete('/api/deleteuser/' + process.usersDetails.boy._id).set('x-auth-token', process.authTokens.jane).send().end((err, res) => {
        console.log("response status: ", res.status, "response body: ", res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql("Unauthorized action.");
        done();
      });
    });
    it('it should DELETE any user from the Database, when the x-auth-token provided in the header is from the user or admin', done => {
      _chai.default.request(_index.default).delete('/api/deleteuser/' + process.usersDetails.boy._id).set('x-auth-token', process.authTokens.boy).send().end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(204);
        done();
      });
    });
  });
};

var _default = myFunction;
exports.default = _default;