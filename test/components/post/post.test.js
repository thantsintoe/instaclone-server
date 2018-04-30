const app = require('../../../server');
const request = require('supertest');
const { expect } = require('chai');
const faker = require('faker');

let userToken;
const random = Math.floor(Math.random(3));

before((done) => {
  request(app)
    .post('/signin')
    .send({
      username: 'thantsintoe',
      password: 'password',
    })
    .expect((res) => {
      userToken = res.body.token;
    })
    .end(done);
});

describe('Create a Product', () => {
  it('create a new product for valid category', (done) => {
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

