import server from '../../index';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);


let myFunction = ()=>{
    describe('/POST comments', () => {
        it('it can not POST comments when no x-auth-token is sent in request\'s header', (done) => {
            let comment = {
                "articleID": process.articleID,
                "commentBody": "Good work!"
            }
            chai.request(server)
            .post('/api/comments')
            .send(comment)
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(401);
                    res.body.should.have.property('error').eql('Access denied. No token provided.');
                done();
            });
        });
        it('it should not POST a comment with an invalid auth token', (done) => {
            let comment = {
                "articleID": process.articleID,
                "commentBody": "Good work!"
            }
            chai.request(server)
            .post('/api/comments')
            .set('x-auth-token','invalid random stuff aksjd')
            .send(comment)
            .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("Invalid token.");
                done();
            });
        });
        it('it should not POST a comment without "commentBody" field', (done) => {
            let comment = {
                "articleID": process.articleID
            }
            chai.request(server)
            .post('/api/comments')
            .set('x-auth-token',process.authTokens.jane)
            .send(comment)
            .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("\"commentBody\" is required");
                done();
            });
        });
        it('it should not POST a comment without "articleID" field', (done) => {
            let comment = {
                "commentBody": "Good work!"
            }
            chai.request(server)
            .post('/api/comments')
            .set('x-auth-token',process.authTokens.jane)
            .send(comment)
            .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error').eql("\"articleID\" is required");
                done();
            });
        });
        it('it should POST a comment when all the 4 above conditions are corrected', (done) => {
            let comment = {
                "articleID": process.articleID,
                "commentBody": "Good work!"
            }
            chai.request(server)
            .post('/api/comments')
            .set('x-auth-token',process.authTokens.jane)
            .send(comment)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.userID.should.be.a('string');
                res.body.name.should.be.a('string');
                res.body.commentBody.should.be.a('string');
                process.commentID = res.body._id;
                done();
            });
        });
            
        
    
    });
}

export default myFunction;