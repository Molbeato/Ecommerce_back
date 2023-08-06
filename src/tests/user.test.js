const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST/ add a user', async() => {
    const user = {
        firstName: "Test",
        lastName: "User",
        email: "tests@gmail.com",
        password: "ascsgezt1234",
        phone: "0426-6865682"
    };

    const res = await request(app).post('/users').send(user);
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(user.firstName);
    expect(res.body.id).toBeDefined();
    expect(res.body.password).not.toBe(user.password)
});

test('POST/ /users/login must log in use', async() =>{
    const body = {
        email: "tests@gmail.com",
        password: "ascsgezt1234",
    }
    const res = await request(app).post('/users/login').send(body);
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()

    token = res.body.token
});

test('GET/ get all users', async() => {
    const res = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('PUT/ /users/:id must update user', async() => {

    const user = {
        firstName: "Ricardo",
    };

    const res = await (request(app).put(`/users/${id}`)).send(user).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(user.firstName);
    
});

test('DELETE/ remove a user', async() => {
    const res = await request(app).delete(`/users/${id}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204)
});

