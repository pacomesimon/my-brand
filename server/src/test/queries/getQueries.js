import server from '../../index';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);

let myFunction = ()=>{
    describe('/GET Queries', () => {
        
        it('it should GET all queries when a valid admin\'s x-auth-token is sent in request\'s header', (done) => {
            chai.request(server)
            .get('/api/queries')
            .set('x-auth-token',process.authTokens.pacome)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
            });
        });
        it('it can not GET queries when a non admin\'s x-auth-token is sent in request\'s header', (done) => {
            chai.request(server)
            .get('/api/queries')
            .set('x-auth-token',process.authTokens.jane)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(401);
                    res.body.should.have.property('error').eql("Unauthorized action.");
                done();
            });
        });
        it('it can not GET queries when a invalid x-auth-token is sent in request\'s header', (done) => {
            chai.request(server)
            .get('/api/queries')
            .set('x-auth-token',"some random stuffs sdkfl")
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(400);
                    res.body.should.have.property('error').eql("Invalid token.");
                done();
            });
        });
        it('it can not GET queries when no x-auth-token is sent in request\'s header', (done) => {
            chai.request(server)
            .get('/api/queries')
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