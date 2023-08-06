const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll({
        include: [{
            model: Product,
            include: [Image]
        }], 
        where: { userId: req.user.id}
    });return res.json(results);
});

const create = catchError(async(req, res) => {
    const cart = await Cart.findAll({
        where: { userId: req.user.id },
        attributes: ['quantity', 'userId', 'productId'],
        raw: true
    })
    
    const result = await Purchase.bulkCreate(cart);
    await Cart.destroy({ where: { userId: req.user.id }});
    
    return res.status(201).json(result);
});

module.exports = {
    getAll,
    create,
}