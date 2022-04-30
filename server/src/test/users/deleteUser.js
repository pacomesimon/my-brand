import server from '../../index';
import chaiHttp from 'chai-http';
import chai from 'chai';
let should = chai.should();

chai.use(chaiHttp);

let myFunction = ()=>{
    describe('/DELETE user', () => {
        

        it('it should not DELETE any user from the Database, when the x-auth-token is not provided in the header', (done) => {
            chai.request(server)
            .delete('/api/users/deleteuser/'+ process.usersDetails.boy._id)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(401);
                    res.body.should.have.property('error').eql('Access denied. No token provided.');
                done();
            });
        });
        it('it should not DELETE any user from the Database, when the x-auth-token provided in the header is not from the user or admin', (done) => {
            chai.request(server)
            .delete('/api/users/deleteuser/'+ process.usersDetails.boy._id)
            .set('x-auth-token',process.authTokens.jane)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(401);
                    res.body.should.have.property('error').eql("Unauthorized action.");
                done();
            });
        });
        it('it should DELETE any user from the Database, when the x-auth-token provided in the header is from the user or admin', (done) => {
            chai.request(server)
            .delete('/api/users/deleteuser/'+ process.usersDetails.boy._id)
            .set('x-auth-token',process.authTokens.boy)
            .send()
            .end((err, res) => {
                    // console.log("response status: ",res.status,"response body: ",res.body);
                    res.should.have.status(204);
                done();
            });
        });
                
        
    
    });
}

export default myFunction;