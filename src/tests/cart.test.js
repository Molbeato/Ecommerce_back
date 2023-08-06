const request = require('supertest');
const app = require('../app');
require('../models')

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: "test2@gmail.com",
        password: "ascsgezt1234",
    })

    token = res.body.token;
})

test('GET/ get all products in cart', async() => {
    const res = await request(app)
    .get('/cart')
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST/ add product to cart', async() => {
    const cart = {
        productId: 1,
        quantity: 10,
    };

    const res = await request(app).post('/cart').send(cart).set('Authorization', `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(cart.quantity);
    expect(res.body.id).toBeDefined();
});

test('PUT/ /cart/:id must update cart', async() => {

    const cart = {
        quantity: 11,
    };

    const res = await (request(app).put(`/cart/${id}`)).send(cart).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(cart.quantity);
});

test('DELETE/ remove a cart', async() => {
    const res = await request(app).delete(`/cart/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});