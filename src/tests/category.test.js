const request = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
        email: "test2@gmail.com",
        password: "ascsgezt1234",
    })

    token = res.body.token;
})

test('GET/ get all categories', async() => {
    const res = await request(app).get('/categories')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST/ add a category', async() => {
    const category = {
        name: "TECH",
    };

    const res = await request(app).post('/categories').send(category).set('Authorization', `Bearer ${token}`);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(category.name);
    expect(res.body.id).toBeDefined();
});


test('PUT/ /categories/:id must update category', async() => {

    const category = {
        name: "Appliance",
    };

    const res = await (request(app).put(`/categories/${id}`)).send(category).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(category.name);
});

test('DELETE/ remove a category', async() => {
    const res = await request(app).delete(`/categories/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});

