const express = require('express');
const router = express.Router();

const cartController = require('../controller/cart');
const authMiddleware = require('../middleware/auth');

// Route to add product to cart
router.post(
    '/add', 
    authMiddleware.validateToken,
    authMiddleware.checkUser,
    cartController.addToCart);

// Route to list items in cart
router.get(
    '/', 
    authMiddleware.validateToken,
    authMiddleware.checkUser,
    cartController.listItems);

router.delete(
    '/:id', 
    authMiddleware.validateToken,
    authMiddleware.checkUser,
    cartController.deleteCartItem);

router.patch(
    '/:id', 
    authMiddleware.validateToken,
    authMiddleware.checkUser,
    cartController.updateCartItem);

module.exports = router;