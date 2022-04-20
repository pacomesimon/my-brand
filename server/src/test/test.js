// process.env.NODE_ENV = 'test';

import chaiHttp from 'chai-http';
import chai from 'chai';
import postSignup from './users/postSignup';
import patchSignup from './users/patchSignup';
import postSignin from './users/postSignin';
import getUserDetails from './users/getUserDetails';
import deleteUser from './users/deleteUser';
import getQueries from './queries/getQueries';
import postQueries from './queries/postQueries';
import deleteQueries from './queries/deleteQueries';
import postArticles from "./articles/postArticles";
import getArticles from "./articles/getArticles";
import patchArticles from "./articles/patchArticles";
import deleteArticle from "./articles/deleteArticle";
import postComments from "./comments/postComments";
import getComments from "./comments/getComments";
import deleteComments from "./comments/deleteComments";
import postLikes from "./likes/postLikes";
import getLikes from "./likes/getLikes";
import deleteLikes from "./likes/deleteLikes";
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
    describe('QUERIES ', ()=>{
        getQueries();
        postQueries();
        deleteQueries();

    });
    describe('ARTICLES',()=>{
        postArticles();
        getArticles();
        patchArticles();
        deleteArticle();
    });
    describe('COMMENTS',()=>{
        postComments();
        getComments();
        deleteComments();
    });
    describe('LIKES',()=>{
        postLikes();
        getLikes();
        deleteLikes();
    });
});

