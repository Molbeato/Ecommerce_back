const request = require('supertest');
const app = require('../app');
const Image = require('../models/Image');
require('../models')

let id;
let token;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: "test2@gmail.com",
        password: "ascsgezt1234",
    })

    token = res.body.token;
})

test('GET/ get all products', async() => {
    const res = await request(app).get('/products')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});


test('POST/ add a product', async() => {
    const product = {
        title: "Smart TV",
        description: "Cheap TV",
        brand: "Samsung",
        price: 100
    };

    const res = await request(app).post('/products').send(product).set('Authorization', `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(product.title);
    expect(res.body.id).toBeDefined();
});

test('GET/ get product', async() => {
    const res = await request(app).get(`/products/${id}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object)
});

test('PUT/ /products/:id must update product', async() => {

    const product = {
        title: "Appliance",
    };

    const res = await (request(app).put(`/products/${id}`)).send(product).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(product.title);
});

test('POST/ /products/:id/images must add a image to product', async() => {
    const image = await Image.create({
        url: "url.com",
        publicId: "ecommerce/url",
    })

    const res = await request(app)
    .post(`/products/${id}/images`)
    .send([image.id])
    .set('Authorization', `Bearer ${token}`);

    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('DELETE/ remove a product', async() => {
    const res = await request(app).delete(`/products/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});