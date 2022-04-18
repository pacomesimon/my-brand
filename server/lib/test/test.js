"use strict";

var _config = _interopRequireDefault(require("config"));

var _index = _interopRequireDefault(require("../index"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chai = _interopRequireDefault(require("chai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// process.env.NODE_ENV = 'test';
let should = _chai.default.should();

_chai.default.use(_chaiHttp.default); //Our parent block


describe('DATABASE TESTS START!', () => {
  before(done => {
    //Before the first test, we do the following:
    done();
  });
  describe('USER SIGNUP AND LOGIN ', () => {
    describe('/POST signup', () => {
      it('it should not POST signup details without NAME field', done => {
        let signupDetails = {
          "email": "Boy@doe.com",
          "password": "abcdefg"
        };

        _chai.default.request(_index.default).post('/api/signup').send(signupDetails).end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql("\"name\" is required");
          done();
        });
      });
      it('it should not POST signup details without EMAIL field', done => {
        let signupDetails = {
          "name": "Boy Doe",
          "password": "abcdefg"
        };

        _chai.default.request(_index.default).post('/api/signup').send(signupDetails).end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql("\"email\" is required");
          done();
        });
      });
      it('it should not POST signup details without PASSWORD field', done => {
        let signupDetails = {
          "name": "Boy Doe",
          "email": "Boy@doe.com"
        };

        _chai.default.request(_index.default).post('/api/signup').send(signupDetails).end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('error').eql("\"password\" is required");
          done();
        });
      });
      it('it should POST signup details (verified), having NAME,EMAIL and PASSWORD', done => {
        let signupDetails = {
          "name": "Boy Doe",
          "email": "Boy@doe.com",
          "password": "abcdefg"
        };

        _chai.default.request(_index.default).post('/api/signup').send(signupDetails).end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');

          res.body._id.should.be.a('string');

          res.body.should.have.property('name').eql(signupDetails.name);
          res.body.should.have.property('email').eql(signupDetails.email);
          done();
        });
      });
    });
  });
  describe('ARTICLES', () => {
    describe('/GET All articles', () => {
      it('it should GET all the articles(empty array)', done => {
        _chai.default.request(_index.default).get('/api/articles').end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
      });
    });
  });
});