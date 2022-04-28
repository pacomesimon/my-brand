import server from '../../index';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);

let myFunction = ()=>{
    describe('/GET Likes', () => {

        it('it can not GET likes when a non admin\'s x-auth-token is sent in request\'s header', (done) => {
            chai.request(server)
            .get('/api/likes')
            .set('x-auth-token',process.authTokens.jane)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(401);
                    res.body.should.have.property('error').eql("Unauthorized action.");
                done();
            });
        });
        it('it can not GET likes when a invalid x-auth-token is sent in request\'s header', (done) => {
            chai.request(server)
            .get('/api/likes')
            .set('x-auth-token',"some random stuffs sdkfl")
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(400);
                    res.body.should.have.property('error').eql("Invalid token.");
                done();
            });
        });
        it('it can not GET likes when no x-auth-token is sent in request\'s header', (done) => {
            chai.request(server)
            .get('/api/likes')
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(401);
                    res.body.should.have.property('error').eql('Access denied. No token provided.');
                done();
            });
        });
        
        it('it should GET all the likes', (done) => {
            chai.request(server)
            .get('/api/likes')
            .set('x-auth-token',process.authTokens.pacome)
            .send()
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
            });
        });
        it('it should GET likes for a single article', (done) => {
            chai.request(server)
            .get('/api/likes/' + process.articleID)
            .set('x-auth-token',process.authTokens.pacome)
            .send()
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
            });
        });
        it('it can not GET a like when the provided like ID is invalid', (done) => {
            chai.request(server)
            .get('/api/likes/'+ "some random stuffs sldjf")
            .set('x-auth-token',process.authTokens.pacome)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(404);
                    res.body.should.have.property('error').eql("Article's likes not found!");
                done();
            });
        });
    
    });
}

export default myFunction;