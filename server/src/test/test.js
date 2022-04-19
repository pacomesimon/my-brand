// process.env.NODE_ENV = 'test';
import config from 'config';
import server from '../index';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import chai from 'chai';
import postSignup from './postSignup';
import patchSignup from './patchSignup';
import postSignin from './postSignin';
import getUserDetails from './getUserDetails';
import deleteUser from './deleteUser';
let should = chai.should();

chai.use(chaiHttp);

process.authTokens = {}; //this variable shall be used to keep authentication tokens
//Our parent block
describe('DATABASE TESTS START!', () => {
    before((done) => { //Before the first test, we do the following:
           // NOTHING TO DO !  
        done();           
    });
    describe('USER SIGNUP AND LOGIN ', ()=>{
        postSignup();
        patchSignup();
        postSignin();
        getUserDetails();
        deleteUser();
    });
    describe('ARTICLES',()=>{
        describe('/GET All articles', () => {
            it('it should GET all the articles(empty array)', (done) => {
                chai.request(server)
                .get('/api/articles')
                .end((err, res) => {
                        // console.log(res.body);
                        // console.log("in Articles, all auth tokens are: ", (process.authTokens));
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                    done();
                });
            });
        });
    });
});
