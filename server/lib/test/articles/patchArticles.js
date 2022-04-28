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
  describe('/PATCH articles', () => {
    it('it can not PATCH articles when no x-auth-token is sent in request\'s header', done => {
      let article = {
        "title": "My alpha Article",
        "previewImageURL": "./images/this.png",
        "articleBody": "Alpha article; alpha expression, alpha impression!"
      };

      _chai.default.request(_index.default).patch('/api/articles/' + process.articleID).send(article).end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(401);
        res.body.should.have.property('error').eql('Access denied. No token provided.');
        done();
      });
    });
    it('it should not PATCH an article with an invalid auth token', done => {
      let article = {
        "title": "My alpha Article",
        "previewImageURL": "./images/this.png",
        "articleBody": "Alpha article; alpha expression, alpha impression!"
      };

      _chai.default.request(_index.default).patch('/api/articles/' + process.articleID).set('x-auth-token', 'invalid random stuff aksjd').send(article).end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql("Invalid token.");
        done();
      });
    });
    it('it should not PATCH an article with a non Admin auth token', done => {
      let article = {
        "title": "My alpha Article",
        "previewImageURL": "./images/this.png",
        "articleBody": "Alpha article; alpha expression, alpha impression!"
      };

      _chai.default.request(_index.default).patch('/api/articles/' + process.articleID).set('x-auth-token', process.authTokens.jane).send(article).end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('error').eql("Unauthorized action.");
        done();
      });
    });
    it('it should PATCH an article without "title" field', done => {
      let article = {
        "previewImageURL": "./images/this.png",
        "articleBody": "Alpha article; alpha expression, alpha impression!"
      };

      _chai.default.request(_index.default).patch('/api/articles/' + process.articleID).set('x-auth-token', process.authTokens.pacome).send(article).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.authorID.should.be.a('string');
        res.body.title.should.be.a('string');
        res.body.previewImageURL.should.be.a('string');
        res.body.articleBody.should.be.a('string');
        res.body.date.should.be.a('string');
        res.body.subject.should.be.a('string');
        res.body.readingTime.should.be.a('string');
        done();
      });
    });
    it('it should PATCH an article without "previewImageURL" field', done => {
      let article = {
        "title": "My alpha Article",
        "articleBody": "Alpha article; alpha expression, alpha impression!"
      };

      _chai.default.request(_index.default).patch('/api/articles/' + process.articleID).set('x-auth-token', process.authTokens.pacome).send(article).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.authorID.should.be.a('string');
        res.body.title.should.be.a('string');
        res.body.previewImageURL.should.be.a('string');
        res.body.articleBody.should.be.a('string');
        res.body.date.should.be.a('string');
        res.body.subject.should.be.a('string');
        res.body.readingTime.should.be.a('string');
        done();
      });
    });
    it('it should PATCH an article without "articleBody" field', done => {
      let article = {
        "title": "My alpha Article",
        "previewImageURL": "./images/this.png"
      };

      _chai.default.request(_index.default).patch('/api/articles/' + process.articleID).set('x-auth-token', process.authTokens.pacome).send(article).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.authorID.should.be.a('string');
        res.body.title.should.be.a('string');
        res.body.previewImageURL.should.be.a('string');
        res.body.articleBody.should.be.a('string');
        res.body.date.should.be.a('string');
        res.body.subject.should.be.a('string');
        res.body.readingTime.should.be.a('string');
        done();
      });
    });
    it('it should not PATCH an article when an invalid article ID is issued', done => {
      let article = {
        "title": "My alpha Article",
        "previewImageURL": "./images/this.png",
        "articleBody": "Alpha article; alpha expression, alpha impression!"
      };

      _chai.default.request(_index.default).patch('/api/articles/' + "some random stuffs sdkl").set('x-auth-token', process.authTokens.pacome).send(article).end((err, res) => {
        // console.log("response status: ",res.status,"response body: ",res.body);
        res.should.have.status(404);
        res.body.should.have.property('error').eql("Article doesn't exist!");
        done();
      });
    });
    it('it should PATCH an article when all the above conditions are corrected', done => {
      let article = {
        "title": "My alpha Article",
        "previewImageURL": "./images/this.png",
        "articleBody": "Alpha article; alpha expression, alpha impression!"
      };

      _chai.default.request(_index.default).patch('/api/articles/' + process.articleID).set('x-auth-token', process.authTokens.pacome).send(article).end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.authorID.should.be.a('string');
        res.body.title.should.be.a('string');
        res.body.previewImageURL.should.be.a('string');
        res.body.articleBody.should.be.a('string');
        res.body.date.should.be.a('string');
        res.body.subject.should.be.a('string');
        res.body.readingTime.should.be.a('string');
        done();
      });
    });
  });
};

var _default = myFunction;
exports.default = _default;