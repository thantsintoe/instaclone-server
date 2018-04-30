const app = require('../../../server');
const request = require('supertest');
const { expect } = require('chai');

describe('Signin Route Handler', () => {
  it('should sign in and get token for thantsintoe', (done) => {
    request(app)
      .post('/signin')
      .send({
        username: 'thantsintoe',
        password: 'password',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('token');
      })
      .end(done);
  });

  it('should not sign in for harrypotter', (done) => {
    request(app)
      .post('/signin')
      .send({
        username: 'harrypotter',
        password: 'wrongpassword',
      })
      .expect(401)
      .expect((res) => {
        expect(res.text).to.equal('Unauthorized');
      })
      .end(done);
  });

  it('should not sign in for empty fields', (done) => {
    request(app)
      .post('/signin')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.text).to.equal('Bad Request');
      })
      .end(done);
  });
});

