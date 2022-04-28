import server from '../../index';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);

let myFunction = ()=>{
    describe('/GET Comments', () => {
        
        it('it should GET all the comments', (done) => {
            chai.request(server)
            .get('/api/comments')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
            });
        });
        it('it should GET comments for a single article', (done) => {
            chai.request(server)
            .get('/api/comments/' + process.articleID)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                done();
            });
        });
        it('it can not GET a comment when the provided comment ID is invalid', (done) => {
            chai.request(server)
            .get('/api/comments/'+ "some random stuffs sldjf")
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(404);
                    res.body.should.have.property('error').eql("Article's comments not found!");
                done();
            });
        });
    
    });
}

export default myFunction;