const app = require('../../../server');
const request = require('supertest');
const { expect } = require('chai');
const faker = require('faker');

let old_user_token;

before(function(done) {
    request(app)
      .post('/signin')
      .send({
        username: 'thantsintoe',
        password: 'password',
      })
      .expect((res) => {
        old_user_token = res.body.token;
      })
      .end(done);
});

describe('Re-create a existing user profile', () => {

  it('NOT recreate an existing user profile', (done) => {
    
    const expected = { code: 501, error: 'Profile already existed' };

    const requestBody = {
        user_profile : {
            email: 'toe@gmail.com',
            mobile: '09799700492',
            profileImage : '',
            address : {
                State : 'Yangon',
                Township : 'Insein'
            },
            productList: []
        }
    }
    request(app)
      .post('/user/profile')
      .set('access-token', old_user_token)
      .send(requestBody)
      .expect(501)
      .expect((res) => {
        expect(res.body).to.eql(expected);
      })
      .end(done);
  });

});

