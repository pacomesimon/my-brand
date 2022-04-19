import server from '../../index';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);

let myFunction = ()=>{
    describe('/GET user details', () => {
        

        it('it should GET any user\'s details (password excluded), when a user._id is provided in the url', (done) => {
            chai.request(server)
            .get('/api/users/'+ process.usersDetails.boy._id)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body._id.should.be.a('string');
                    res.body.name.should.be.a('string');
                    res.body.email.should.be.a('string');
                    res.body.membership.should.be.a('string');
                done();
            });
        });
        it('it should GET all users\' details when a valid admin\'s x-auth-token is sent in request\'s header', (done) => {
            chai.request(server)
            .get('/api/users/')
            .set('x-auth-token',process.authTokens.pacome)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
            });
        });
        it('it can not GET all users\' details when a non admin\'s x-auth-token is sent in request\'s header', (done) => {
            chai.request(server)
            .get('/api/users/')
            .set('x-auth-token',process.authTokens.boy)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(401);
                    res.body.should.have.property('error').eql("Unauthorized action.");
                done();
            });
        });
        it('it can not GET all users\' details when no x-auth-token is sent in request\'s header', (done) => {
            chai.request(server)
            .get('/api/users/')
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(401);
                    res.body.should.have.property('error').eql('Access denied. No token provided.');
                done();
            });
        });
        
        
        
        
    
    });
}

export default myFunction;