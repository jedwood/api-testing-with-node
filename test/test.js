var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest('http://localhost:5000');

describe('Authentication', function() {

  it('errors if wrong basic auth', function(done) {
    api.get('/blog')
    .set('x-api-key', '123myapikey')
    .auth('incorrect', 'credentials')
    .expect(401, done)
  });

  it('errors if bad x-api-key header', function(done) {
    api.get('/blog')
    .auth('correct', 'credentials')
    .expect(401)
    .expect({error:"Bad or missing app identification header"}, done);
  });

});


describe('/blog', function() {

  it('returns blog posts as JSON', function(done) {
    api.get('/blog')
    .set('x-api-key', '123myapikey')
    .auth('correct', 'credentials')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.have.property('posts').and.be.instanceof(Array);
      done();
    });
  });

});
