const sequelize = require('../utils/connection');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        
        const user =  {
            firstName: "Test",
            lastName: "User",
            email: "test2@gmail.com",
            password: "ascsgezt1234",
            phone: "0426-6865682"
        }
        const userFound = await User.findOne({ 
            where : { email: user.email }
        })
        if(!userFound){
            await request(app).post('/users').send(user)
        }

        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();