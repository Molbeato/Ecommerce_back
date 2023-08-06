const request = require('supertest');
const app = require('../app');

let token;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: "test2@gmail.com",
        password: "ascsgezt1234",
    })

    token = res.body.token;
})

test('GET/ get all product_images', async() => {
    const res = await request(app).get('/product_images').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});
