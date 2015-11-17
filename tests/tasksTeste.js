var request = require('supertest'),
    assert  = require('assert'),
    app     = require('../app'),
    db      = require('../Db/sqlite3'),
    _id;


describe.only('Task Endpoints', function(){
  beforeEach(function(done) {
    db.collection('tasks').remove({}, done);
  });

  it('GET /tasks', function(done){
    db.collection('tasks').insert({ 'name': 'Walter White' }, function(){
      db.collection('tasks').insert({ 'name': 'Goku' }, function(){

        request(app)
          .get('/tasks')
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

  it('GET /tasks/:id', function(done){
    request(app)
      .get('/tasks/' + _id)
      .expect(200)
      .end(function(err, res){
        var data = res.body;

        assert.equal(data.length, 4);
        done();
      });
  });

  it.only('POST /tasks', function(done){
    request(app)
      .post('/tasks')
      .send({ 'name': 'Other name', 'price': 19.90 })
      .expect(200)
      .end(function(err, res){
        var data = res.body;

        assert.equal(data.length, 4);
        done();
      });
  });

  it('PUT /tasks/:id', function(done){
    request(app)
      .put('/tasks/' + _id)
      .send({ 'name': 'Other name' })
      .expect(200)
      .end(function(err, res){
        var data = res.body;

        assert.equal(data.length, 4);
        done();
      });
  });

  it('DELETE /tasks/:id', function(done){
    request(app)
      .delete('/tasks/' + _id)
      .expect(200)
      .end(function(err, res){
        var data = res.body;

        assert.equal(data.length, 4);
        done();
      });
  });
});
