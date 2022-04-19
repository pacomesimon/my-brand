import server from '../index';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);

let myFunction = ()=>{
    describe('/POST signin', () => {
        it('it can not sign in without providing email', (done) => {
            let signinDetails = {
                "password": "abcdefg"
            }
            chai.request(server)
            .post('/api/signin/')
            .send(signinDetails)
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('"email" is required');
                done();
            });
        });
        it('it can not sign in without providing password', (done) => {
            let signinDetails = {
                "email": "smbonimpa2011@gmail.com"
            }
            chai.request(server)
            .post('/api/signin/')
            .send(signinDetails)
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('"password" is required');
                done();
            });
        });
        it('it should not sign in, when a non recognized email is provided', (done) => {
            let signinDetails = {
                "email": "ddddsmbonimpa2011@gmail.com",
                "password": "abcdefg"
            }
            chai.request(server)
            .post('/api/signin/')
            .send(signinDetails)
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('Invalid password or Email.');
                done();
            });
        });
        it('it should not sign in, when an invalid password is provided', (done) => {
            let signinDetails = {
                "email": "smbonimpa2011@gmail.com",
                "password": "zzzzzzzzzabcdefg"
            }
            chai.request(server)
            .post('/api/signin/')
            .send(signinDetails)
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql('Invalid Passw0rd or email.');
                done();
            });
        });
        it('it should sign in, when a valid email and its password are provided', (done) => {
            let signinDetails = {
                "email": "smbonimpa2011@gmail.com",
                "password": "abcdefg"
            }
            chai.request(server)
            .post('/api/signin/')
            .send(signinDetails)
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(200);
                    res.header["x-auth-token"].should.be.a('string');
                    res.body.should.be.a('object');
                    res.body._id.should.be.a('string');
                    res.body.name.should.be.a('string');
                    res.body.email.should.be.a('string');
                    res.body.membership.should.be.a('string');
                done();
            });
        });
        
        
        
    
    });
}

export default myFunction;