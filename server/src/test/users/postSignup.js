import server from '../../index';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);


let authTokens = {};
let usersDetails = {};
let myFunction = ()=>{
    describe('/POST signup', () => {
        it('it should not POST signup details without NAME field', (done) => {
            let signupDetails = {
                "email": "boy@doe.com",
                "password": "abcdefg"
            }
            chai.request(server)
            .post('/api/users/signup')
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
            .post('/api/users/signup')
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
                "email": "boy@doe.com"
            }
            chai.request(server)
            .post('/api/users/signup')
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
                "email": "boy@doe.com",
                "password": "abcdefg"
            }
            chai.request(server)
            .post('/api/users/signup')
            .send(signupDetails)
            .end((err, res) => {
                    // authTokens.boy = res.header["x-auth-token"];
                    authTokens.boy = res.body["x-auth-token"];
                    res.header["user-id"].should.be.a('string');
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    // usersDetails.boy = res.body;
                    usersDetails.boy = { _id : res.header["user-id"]};
                done();
            });
        });
        it('it can\'t POST an already registered EMAIL for signup', (done) => {
            let signupDetails = {
                "name": "Man Doe",
                "email": "boy@doe.com",
                "password": "man1s@b31nG"
            }
            chai.request(server)
            .post('/api/users/signup')
            .send(signupDetails)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("Email is already registered by another user.");
                done();
            });
        });
        it('it should POST new signup details (verified), having a non-registered EMAIL', (done) => {
            let signupDetails = {
                "name": "Pacome Simon",
                "email": "smbonimpa2011@gmail.com",
                "password": "abcdefg"
            }
            chai.request(server)
            .post('/api/users/signup')
            .send(signupDetails)
            .end((err, res) => {
                    authTokens.pacome = res.body["x-auth-token"];
                    res.header["user-id"].should.be.a('string');
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    usersDetails.pacome = { _id : res.header["user-id"]};
                done();
            });
        });
        it('it should POST another new signup details (verified), having a non-registered EMAIL', (done) => {
            let signupDetails = {
                "name": "Jane Doe",
                "email": "jane@doe.com",
                "password": "abcdefg"
            }
            chai.request(server)
            .post('/api/users/signup')
            .send(signupDetails)
            .end((err, res) => {
                    authTokens.jane = res.body["x-auth-token"];
                    process.authTokens = {... authTokens};
                    // console.log("After Jane, all auth tokens: ", process.authTokens);
                    res.header["user-id"].should.be.a('string');
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    usersDetails.jane = { _id : res.header["user-id"]};
                    process.usersDetails = {... usersDetails};
                    // console.log("After Jane, all users: ", process.usersDetails);
                done();
            });
        });
        
    
    });
}

export default myFunction;