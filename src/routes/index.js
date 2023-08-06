const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const imageRouter = require('./image.router');
const productRouter = require('./product.router');
const cartRouter = require('./cart.router');
const purchaseRouter = require('./purchase.router');
const router = express.Router();

router.use('/users', userRouter)
router.use('/categories', categoryRouter)
router.use('/product_images', imageRouter)
router.use('/products', productRouter)
router.use('/cart', cartRouter)
router.use('/purchases', purchaseRouter)


module.exports = router;