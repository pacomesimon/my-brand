import server from '../index';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);

let myFunction = ()=>{
    describe('/PATCH change credentials', () => {
        it('it can not change a user\'s credentials without the x-auth-token in request\'s header', (done) => {
            let signupDetails = {
                "email": "boy@doe.com",
                "password": "abcdefg"
            }
            chai.request(server)
            .patch('/api/changecreds/'+ process.usersDetails.boy._id)
            .send(signupDetails)
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("Access denied. No token provided.");
                done();
            });
        });
        it('it can not change a user\'s credentials with an invalid x-auth-token in request\'s header', (done) => {
            let signupDetails = {
                "email": "boy@doe.com",
                "password": "abcdefg"
            }
            chai.request(server)
            .patch('/api/changecreds/'+ process.usersDetails.boy._id)
            .set('x-auth-token', 'invalid random stuff zxxvzxvzlj')
            .send(signupDetails)
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("Invalid token.");
                done();
            });
        });
        it('it should change a user\'s credentials with a valid x-auth-token in request\'s header', (done) => {
            let signupDetails = {
                "name": "Boys Does",
                "email": "boys@does.com",
                "password": "abcdefg"
            }
            chai.request(server)
            .patch('/api/changecreds/'+ process.usersDetails.boy._id)
            .set('x-auth-token',process.authTokens.boy)
            .send(signupDetails)
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.header["x-auth-token"].should.be.a('string');
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body._id.should.be.a('string');
                    res.body.should.have.property('name').eql(signupDetails.name);
                    res.body.should.have.property('email').eql(signupDetails.email);
                    res.body.membership.should.be.a('string');
                done();
            });
        });
        it('it can not promote a user to ADMIN or to MEMBER without a valid admin\'s x-auth-token in request\'s header', (done) => {
            chai.request(server)
            .patch('/api/promote/'+ process.usersDetails.jane._id)
            .set('x-auth-token',process.authTokens.boy)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("Unauthorized action.");
                done();
            });
        });
        it('it can promote a user to ADMIN with admin\'s x-auth-token in request\'s header', (done) => {
            chai.request(server)
            .patch('/api/promote/'+ process.usersDetails.jane._id)
            .set('x-auth-token',process.authTokens.pacome)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body._id.should.be.a('string');
                    res.body.name.should.be.a('string');
                    res.body.email.should.be.a('string');
                    res.body.should.have.property('membership').eql('admin');
                done();
            });
        });
        it('it can demote an admin to MEMBER with any admin\'s x-auth-token in request\'s header', (done) => {
            chai.request(server)
            .patch('/api/promote/'+ process.usersDetails.jane._id)
            .set('x-auth-token',process.authTokens.pacome)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body._id.should.be.a('string');
                    res.body.name.should.be.a('string');
                    res.body.email.should.be.a('string');
                    res.body.should.have.property('membership').eql('member');
                done();
            });
        });
        
        
    
    });
}

export default myFunction;