import server from '../../index';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);

let myFunction = ()=>{
    describe('/GET Articles', () => {
        
        it('it should GET all the articles', (done) => {
            chai.request(server)
            .get('/api/articles')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                done();
            });
        });
        it('it should GET a single article', (done) => {
            chai.request(server)
            .get('/api/articles/' + process.articleID)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.article.should.be.a('object');
                    res.body.likes.should.be.a('array');
                    res.body.comments.should.be.a('array');
                done();
            });
        });
        it('it can not GET a article when the provided article ID is invalid', (done) => {
            chai.request(server)
            .get('/api/articles/'+ "some random stuffs sldjf")
            .set('x-auth-token',process.authTokens.pacome)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(404);
                    res.body.should.have.property('error').eql("Article doesn't exist!");
                done();
            });
        });
    
    });
}

export default myFunction;