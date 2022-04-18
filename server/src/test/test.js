// process.env.NODE_ENV = 'test';
import config from 'config';
import server from '../index';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);


//Our parent block
describe('DATABASE TESTS START!', () => {
    before((done) => { //Before the first test, we do the following:
        
        done();           
    });
    describe('USER SIGNUP AND LOGIN ',()=>{
        describe('/POST signup', () => {
            it('it should not POST signup details without NAME field', (done) => {
                let signupDetails = {
                    "email": "Boy@doe.com",
                    "password": "abcdefg"
                }
            chai.request(server)
                .post('/api/signup')
                .send(signupDetails)
                .end((err, res) => {
                        res.should.have.status(422);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error').eql("\"name\" is required");
                    done();
                });
            });
            it('it should not POST signup details without EMAIL field', (done) => {
                let signupDetails = {
                    "name": "Boy Doe",
                    "password": "abcdefg"
                }
            chai.request(server)
                .post('/api/signup')
                .send(signupDetails)
                .end((err, res) => {
                        res.should.have.status(422);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error').eql("\"email\" is required");
                    done();
                });
            });
            it('it should not POST signup details without PASSWORD field', (done) => {
                let signupDetails = {
                    "name": "Boy Doe",
                    "email": "Boy@doe.com"
                }
            chai.request(server)
                .post('/api/signup')
                .send(signupDetails)
                .end((err, res) => {
                        res.should.have.status(422);
                        res.body.should.be.a('object');
                        res.body.should.have.property('error').eql("\"password\" is required");
                    done();
                });
            });
            it('it should POST signup details (verified), having NAME,EMAIL and PASSWORD', (done) => {
                let signupDetails = {
                    "name": "Boy Doe",
                    "email": "Boy@doe.com",
                    "password": "abcdefg"
                }
            chai.request(server)
                .post('/api/signup')
                .send(signupDetails)
                .end((err, res) => {
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
    describe('ARTICLES',()=>{
        describe('/GET All articles', () => {
            it('it should GET all the articles(empty array)', (done) => {
            chai.request(server)
                .get('/api/articles')
                .end((err, res) => {
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
