var request = require('supertest'),
    assert  = require('assert'),
    app     = require('../app'),
    db      = require('../Db/mongo'),
    _id;


describe.only('License Endpoints', function(){
  beforeEach(function(done) {
    db.collection('License').remove({}, done);
  });

  it('GET /License', function(done){
    db.collection('License').insert({ 'name': 'Walter White' }, function(){
      db.collection('License').insert({ 'name': 'Goku' }, function(){

        request(app)
          .get('/License')
          .expect(200)
          .end(function(err, res){
            var data = res.body;

            assert.equal(data[0].name, 'Walter White');
            assert.equal(data[1].name, 'Goku');
            assert.equal(data.length, 2);
            done();
          });
      });
    });
  });

  it('GET /License/:id', function(done){
    request(app)
      .get('/License/' + _id)
      .expect(200)
      .end(function(err, res){
        var data = res.body;

        assert.equal(data.length, 4);
        done();
      });
  });

  it.only('POST /License', function(done){
    request(app)
      .post('/License')
      .send({ 'name': 'Other name', 'price': 19.90 })
      .expect(200)
      .end(function(err, res){
        var data = res.body;

        assert.equal(data.length, 4);
        done();
      });
  });

  it('PUT /License/:id', function(done){
    request(app)
      .put('/License/' + _id)
      .send({ 'name': 'Other name' })
      .expect(200)
      .end(function(err, res){
        var data = res.body;

        assert.equal(data.length, 4);
        done();
      });
  });

  it('DELETE /License/:id', function(done){
    request(app)
      .delete('/License/' + _id)
      .expect(200)
      .end(function(err, res){
        var data = res.body;

        assert.equal(data.length, 4);
        done();
      });
  });
});
