var expect = require('chai').expect;
var should = require('chai').should;
var supertest = require('supertest');

var api = supertest('http://localhost:3000');

describe('Boop routes', function() {
  it('Responds with status code 200 on a GET /boops', (done) => {
    api.get('/')
    .expect(200)
    .end((err, res) => done());
  });

  it('Responds with status code 201 on a POST to /boops', (done) => {
    api.post('/')
    .expect(201)
    .end((err, res) => done());
  });
});