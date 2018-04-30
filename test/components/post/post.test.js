const app = require('../../../server');
const request = require('supertest');
const { expect } = require('chai');
const faker = require('faker');
const User = require('../../../models/user');
const Post = require('../../../models/post');

let user;

before((done) => {
  User.create({
    socialId: '115296914622746541788',
    socialPlatform: 'google',
    displayName: 'ThantSin Toe',
  }, (error, createdUser) => {
    console.log(createdUser)
    user = createdUser;
    done();
  });
});

describe('Create a new post', () => {
  it('create a new post for valid input', (done) => {
    const requestBody = {
      product: {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        productDetail: {
          description: faker.commerce.productAdjective(),
          brand: faker.company.companyName(),
          condition: 'used',
          imageURL: [],
          status: 'active',
          category: categoryArr[random],
        },
      },
    };

    request(app)
      .post('/api/product')
      .set('access-token', userToken)
      .send(requestBody)
      .expect(200)
      .expect((res) => {
        console.log(res.body);
      })
      .end(done);
  });

  it('NOT create a product for unknown category', (done) => {
    const requestBody = {
      product: {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        productDetail: {
          description: faker.commerce.productAdjective(),
          brand: faker.company.companyName(),
          condition: 'used',
          imageURL: [],
          status: 'active',
          category: 'unknown',
        },
      },
    };

    request(app)
      .post('/api/product')
      .set('access-token', userToken)
      .send(requestBody)
      .expect(501)
      .end(done);
  });
});

