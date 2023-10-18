const express = require('express');
const router = express.Router();

// Other routes can be added similarly
const cartController = require('../controller/cart');
const transactionController = require('../controller/transaction');
const authMiddleware = require('../middleware/auth');

// Checkout route
router.post(
    '/checkout', 
    authMiddleware.validateToken,
    authMiddleware.checkUser,
    transactionController.checkout,
    cartController.clearCartItems,
    (req, res) => {
        if (req.checkoutError) {
            return res.status(500).json({ success: false, message: req.checkoutError });
        }
        res.json({ success: true, message: 'Checkout successful and cart cleared.' });
    }
);
        
module.exports = router;