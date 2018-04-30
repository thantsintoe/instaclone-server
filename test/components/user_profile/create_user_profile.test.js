const app = require('../../../server');
const request = require('supertest');
const { expect } = require('chai');
const faker = require('faker');

let new_user_token;
const randomName = faker.name.firstName();
const randomEmail = faker.internet.email();

before(function(done) {
    request(app)
      .post('/signup')
      .send({
        username: randomName,
        password: 'password',
      })
      .expect((res) => {
        new_user_token = res.body.token;
      })
      .end(done);
});

describe('Create a user profile', () => {

  it('create a user profile', (done) => {
    
    const requestBody = {
        user_profile : {
            email: randomEmail,
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
      .set('access-token', new_user_token)
      .send(requestBody)
      .expect(200)
      .end(done);
  });

});

